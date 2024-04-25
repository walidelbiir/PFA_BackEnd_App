const mongoose=require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server')


const connectDB= async ()=>{
    const mongoServer = new MongoMemoryServer()
    console.log("connecting to DB...");
    const mongoUri = process.env.NODE_ENV === 'test' ? await mongoServer.getUri() : process.env.MONGO_URI;
    mongoose.connect(mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=>console.log("DB connected"))
    .catch(err => console.error(err));      
}
module.exports=connectDB;
