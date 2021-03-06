import AvionDB from "../src/index";
import Collection from "../src/core/Collection";
const Cache = require("orbit-db-cache");
const Keystore = require("orbit-db-keystore");
const IdentityProvider = require("orbit-db-identity-provider");
const assert = require("assert");
const IPFS = require("ipfs");
const Path = require("path");
//TODO: proper fix for using ipfs in tests requiring node to be online

const DefaultOptions = { path: "./.testdb" };
// Test utils
const { config, implementations } = require("orbit-db-test-utils");

const properLevelModule = implementations
  .filter((i) => i.key.indexOf("memdown") > -1)
  .map((i) => i.module)[0];
const storage = require("orbit-db-storage-adapter")(properLevelModule);

describe("DB", function () {
  let ipfs, testIdentity, identityStore, store, cacheStore;

  this.timeout(config.timeout);
  const ipfsConfig = Object.assign(
    {},
    {
      repo: config.defaultIpfsConfig.repo + "-entry" + new Date().getTime(),
      start: true,
      config: {
        Addresses: {
          API: "/ip4/127.0.0.1/tcp/0",
          Swarm: ["/ip4/0.0.0.0/tcp/0"],
          Gateway: "/ip4/0.0.0.0/tcp/0",
        },
        Bootstrap: [],
        Discovery: {
          MDNS: { Enabled: true, Interval: 0 },
          webRTCStar: { Enabled: false },
        },
      },
      EXPERIMENTAL: {
        pubsub: true,
      },
    }
  );

  before(async () => {
    identityStore = await storage.createStore("identity");
    const keystore = new Keystore(identityStore);

    cacheStore = await storage.createStore("cache");
    await cacheStore.open();
    const cache = new Cache(cacheStore);

    testIdentity = await IdentityProvider.createIdentity({
      id: "userA",
      keystore,
    });
    //ipfs = await startIpfs("js-ipfs", ipfsConfig)
    ipfs = await IPFS.create(ipfsConfig);
    const name = "test-address";
    const options = Object.assign({}, DefaultOptions, { cache });
    store = await AvionDB.init(name, ipfs, options, {
      identity: testIdentity,
    });
    await store.load();
  });
  after(async () => {
    await store.close();
    //await stopIpfs(ipfs)
    await ipfs.stop();
    await identityStore.close();
    await cacheStore.close();
  });
  afterEach(async () => {
    await store.drop();
    await cacheStore.open();
    await identityStore.open();
  });
  it("Get Config Path", async () => {
    assert.strictEqual(
      AvionDB.getDatabaseConfig().path,
      Path.join(__dirname, "../.testdb", "db")
    );
  });

  it("List Databases", async () => {
    const databases = await AvionDB.listDatabases();
    assert.strictEqual(arraysEqual(databases, ["test-address"]), true);
  });

  it("Init Collection", async () => {
    const collection = await store.initCollection("Accounts");
    await collection.insertOne({
      name: "vasa",
    });
    const addr = require("orbit-db/src/orbit-db-address");
    assert.strict(collection.address instanceof addr, true);
    assert.strictEqual(collection instanceof Collection, true);
  });
  it("Drop Collection", async () => {
    //TODO: Create test here
  });
  it("List Collections", async () => {
    const collection = await store.initCollection("Users");
    await collection.insertOne({
      name: "vasa",
    });
    const collections = store.listCollections();
    assert.strictEqual(arraysEqual(collections, ["Users"]), true);
  });
});

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
