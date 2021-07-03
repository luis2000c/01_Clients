
const { MongoConnection } = require("../lib/Mongo")
var ObjectId = require("mongodb").ObjectID;
var randtoken = require('rand-token');

//Collection
const COLLECTION = "clients";

const findUsers = (id) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const clientList = await clients.find({}).toArray()
        if(id != undefined){
            var filterResult = clientList.filter((clt) => clt._id == id);
            resolve(filterResult);
        }
        resolve(clientList)
    } catch (error) {
        reject(error)
    }

})

const createUser = (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        var token = randtoken.generate(16);
        const result = await clients.insertOne({
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            codigo_acceso: token,
            password: token,
            rol: '60e0b39af894b50f046b720b',
            nuevo_usuario: true
        });
        resolve(result);
    } catch (error) {
        reject(error)
    }
})
const updateUser = (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const clients = DB.collection(COLLECTION);
        const result = await clients.updateOne(
            {"_id": ObjectId(id)},
            {
                $set: {
                    primer_nombre: primer_nombre, 
                    segundo_nombre: segundo_nombre,
                    primer_apellido: primer_apellido,
                    segundo_apellido: segundo_apellido  
                      }
            }
        )
        resolve(result);
    } catch (error) {
        reject(error)
    }
});
const deleteUser = (id) => new Promise(async (resolve, reject)=>{
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const result = await clients.deleteOne(
            {"_id" : ObjectId(id)}
        )
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

const change_password = (id, new_password, repeat_password) => new Promise(async(resolve, reject) => {

    try {  
        const DB = await MongoConnection();
        const clients = DB.collection(COLLECTION);
        if(new_password === repeat_password){
            const result = await clients.updateOne(
                {"_id": ObjectId(id)},
                {
                    $set: {
                        password: new_password, 
                        nuevo_usuario: false  
                          }
                }
            )
            resolve(result);
        }
        else{
            let error = {
                msg: "error",
            }
            resolve(error);
        }
    } catch (error) {
        reject(error)
    }
});
module.exports = {
    findUsers, createUser, updateUser, deleteUser,change_password,
}