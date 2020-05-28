import Store from "./Store";
import EnvironmentAdapter from "./EnvironmentAdapter";
import Collection from "./Collection";
import { Ipfs } from "ipfs";
const { Key } = require("interface-datastore");
let datastore = EnvironmentAdapter.datastore(EnvironmentAdapter.repoPath());

class AvionDB extends Store {
  static Collection = Collection;

  static async init(name, ipfs: Ipfs, options: any = {}, orbitDbOptions) {
    if (options.path) {
      this.setDatabaseConfig({ path: options.path });
    }
    const aviondb = await super.init(name, ipfs, options, orbitDbOptions);
    const buf = Buffer.from(JSON.stringify({ address: aviondb.id }));
    await datastore.put(new Key(`${name}`), buf);
    return Promise.resolve(aviondb);
  }

  static async listDatabases() {
    const dbs = datastore.query({});
    const list = [];
    for await (const db of dbs) {
      const arr = JSON.parse(db.value.toString()).address.split("/");
      list.push(arr[arr.length - 1]);
    }
    return list;
  }

  static setDatabaseConfig(options: any = {}) {
    datastore = EnvironmentAdapter.datastore(
      EnvironmentAdapter.repoPath(options.path)
    );
  }

  static getDatabaseConfig(options: any = {}) {
    return datastore;
  }
}

export default AvionDB;
