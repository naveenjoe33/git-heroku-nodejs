import { MongoClient } from "mongodb";
import { managerrouter } from "./routes/manager.js";
import { app } from "./index.js";
import bcrypt from "bcrypt"
async function getuserbyid(client, id) {
    return await client.db("users").collection("people").findOne({ id: id })
}

async function addusers(client, data) {
    return await client.db("users").collection("people").insertMany(data)
}

async function addmovies(client, addmovies) {
    return await client.db("users").collection("movies").insertMany(addmovies)
}

async function edituserbyid(client, id) {
    return await client.db("users").collection("people").deleteOne({ id: id })
}

async function updateuserbyid(client, id, newdata) {
    return await client.db("users").collection("people").updateOne({ id: id }, { $set: newdata })
}

async function sendsignupmanager(client, username, hashedpassword) {
    return await client.db("users").collection("managers").insertOne({ username, password: hashedpassword })
}

function getmanagers(client) {
    return client.db("users").collection("managers").find({}).toArray()
}

async function getallusers(client) {
    return await client.db("users").collection("people").find({}).toArray()
}

async function getmovies(client) {
    return await client.db("users").collection("movies").find({}).toArray()
}


async function genpass(password) {
    const salt = await bcrypt.genSalt(4);
    const hashedpassword = await bcrypt.hash(password, salt)
    return hashedpassword
}




export async function createconnection() {
    // const MONGO_URL = "mongodb://localhost/users";
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Sucessfully connected");
    // const insertdata = await client.db("users").collection("people").insertMany(users)
    return client;

    const user = await client;
    //     .db("users").collection("people").findOne({ id: "5" })
    // console.log(user)
}



export {
    getuserbyid,
    addusers,
    edituserbyid,
    updateuserbyid,
    sendsignupmanager,
    getmanagers,
    getallusers,
    genpass,
    addmovies,
    getmovies

}