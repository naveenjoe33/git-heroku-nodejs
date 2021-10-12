import express from "express";
import { genpass, createconnection, getmanagers, sendsignupmanager } from "../helper.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router()
router.get("/", async (req, res) => {
    var { q } = req.query;
    const { id } = req.params;
    var client = await createconnection();
    const user = await getmanagers(client)
    console.log(user)

    res.send(user)
})


router.post("/signup", async (req, res) => {
    const client = await createconnection();
    console.log(req.body)
    var { username, password } = req.body
    var hashedpassword = await genpass(password)
    const result = await sendsignupmanager(client, username, hashedpassword);
    console.log(result)
    res.send({ result })
    // const insertdata = await client.db("users").collection("managers").insertOne(users)

});

router.post("/login", async (req, res) => {
    const client = await createconnection();
    console.log(req.body)
    var { username, password } = req.body
    const result = await client.db("users").collection("managers").findOne({ username: username })
    console.log(result)
    const hashedpassword = result.password;
    const ispassmatch = await bcrypt.compare(password, hashedpassword)
    if (ispassmatch) {
        const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY)
        res.send({ message: "LOGGED YOU IN! SUCCESSFUL MATCH!", token: token })
    } else {
        res.send("INCORRECT!")
    }


    // const insertdata = await client.db("users").collection("managers").insertOne(users)

});

export const managerrouter = router;