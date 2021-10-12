import express from "express";
const router = express.Router()
import {
    getuserbyid,
    addusers,
    edituserbyid,
    updateuserbyid,
    sendsignupmanager,
    getmanagers,
    getallusers,
    genpass, createconnection
} from "../helper.js"
import auth from "../middleware/auth.js"
import jwt from "jsonwebtoken"

router.get('', auth, async function (req, res) {
    var client = await createconnection();

    var { color, agegt } = req.query;
    if (color && agegt) {
        const user = await client.db("users").collection("people").find({ age: { $gt: parseInt(agegt) } }, { color: color }).toArray()

        res.send(user)
        // res.send(users.filter(data => data.color == (color) && data.age >= (age)))
    }
    else if (color) {
        const user = await client.db("users").collection("people").find({ color: color }).toArray()
        res.send(user)
        // res.send(users.filter(data => data.color === (color)))
    }
    else if (agegt) {
        const user = await client.db("users").collection("people").find({ age: { $gt: parseInt(agegt) } }).toArray()
        res.send(user)
    }
    else {
        const user = await getallusers(client)
        res.send(user)

    }
})




router.patch("/:id", async (req, res) => {
    console.log(req.body)
    const { id } = req.params
    const client = await createconnection()
    const newdata = req.body;
    console.log(id, newdata)
    const user = await updateuserbyid(client, id, newdata);
    console.log(user)
    res.send(user)
})

router.delete("/:id", async (req, res) => {
    console.log(req.params)
    const { id } = req.params;

    var client = await createconnection();
    const user = await edituserbyid(client, id)
    console.log(user)

    res.send(user)
})

router.post("/", async (req, res) => {
    const client = await createconnection();
    console.log(req.body)
    var data = req.body
    const user = await addusers(client, data);
    res.send(user)

});

router.get("/:id", async (req, res) => {
    var { q } = req.query;
    const { id } = req.params;
    var client = await createconnection();
    const user = await getuserbyid(client, id)
    console.log(user)

    res.send(user)
})






export const userrouter = router;