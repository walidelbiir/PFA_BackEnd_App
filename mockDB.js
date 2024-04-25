const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose= require('mongoose')

const mongod = new MongoMemoryServer()


module.exports.stop = async () => {
    await mongoose.disconnect();
    await mongod.stop();
}