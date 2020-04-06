const OrbitdbStore = require("orbit-db-store")
const CollectionIndex = require('./CollectionIndex')
const ObjectId = require("bson-objectid")

class Collection extends OrbitdbStore {
    constructor(ipfs, id, dbname, options) {
        let opts = Object.assign({}, { Index: CollectionIndex });
        Object.assign(opts, options);
        super(ipfs, id, dbname, opts);
        this._type = 'ipfsdb.collection';
    }
    insert(docs) {
        for (var doc of docs) {
            if (!doc._id) {
                doc._id = ObjectId.generate()
            }
        }
        return this._addOperation({
            op: "INSERT",
            value: docs
        })
    }
    async insertOne(doc) {
        if (typeof doc !== "object")
            throw "Object documents are only supported"
        
        return (await this.insert([doc]))[0]; ''
    }
    find(query) {
        return this._index.find(query);
    }
    async findOne(query) {
        return (await this.find(query))[0];
    }
    async findOneAndUpdate(query, modification) {

    }
    async findOneAndDelete(query) {

    }
    distinct(key, query) {
        return this._index.distinct(key, query)
    }
    async drop() {

    }
}
module.exports = Collection;