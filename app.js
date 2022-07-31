
const express = require('express')
const app = express()
const client = require("./db.js")
const db = client.db()

app.use(express.json())
app.use(express.urlencoded({extended:false}));


//Find all query
app.get("/", async (req, res) => {
  try {
    //Await a connection to mongodb atlas
    const db = await client.db('db101')
    const dbLessons = await db.collection("lessons").find().toArray()
    console.log(JSON.stringify(dbLessons))

//check for lessons inside the database
    if (dbLessons.length) {
      res.json("You have " + dbLessons.length + " document in your collections."+ JSON.stringify(dbLessons))
      console.log("You have " + dbLessons.length + " document in your collections.")
    } else {
      res.json("You do not currently have any lessons in your  collection.")
    }
  } catch (err) {
    console.log(err)
    res.json("Try again later.")
  }
})

module.exports = app


