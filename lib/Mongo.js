const {MongoClient} = require("mongodb");

const DB_NAME = "clients"
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@practicantp.vty3h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
//Para indicar que se trabajara con código asincrono se usa el async
var MongoConnection = () => new Promise (async (resolve, reject)=>{
    try {
        let client = new MongoClient(URL,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })
        await client.connect()
        //let db = client.db(DB_NAME)
        resolve(client.db(DB_NAME))
    } catch (error) {
        reject(error)
    }
})

module.exports.MongoConnection = MongoConnection;