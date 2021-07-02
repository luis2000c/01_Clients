
const { MongoConnection } = require("../lib/Mongo")


//Collection
const COLLECTION = "clients";

const findUsers = () => new Promise(async (resolve, reject) => {
    try {
        //Inicializo mongoclient para que me retorne la configuracion de la db
        const DB = await MongoConnection()
        //Obtenemos la colección
        const clients = DB.collection(COLLECTION)
        const clientList = await clients.find({}).toArray()
        resolve(clientList)
    } catch (error) {
        reject(error)
    }

})

const createUser = (user) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const result = await clients.insertOne(user)
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

const updateUser = (id, nombre, apellido) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const result = await clients.update(
            { nombre, apellido },
            {
                where: {
                    id,
                }
            })
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    findUsers, createUser, updateUser,
}