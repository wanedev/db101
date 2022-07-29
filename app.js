const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const client = require("./db.js")
const db = client.db()

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.get("/", async (req, res) => {
  try {
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").find({subject:"database"}).toArray()
    // res.send("Database data:" + JSON.stringify(dbLessons))
    console.log(dbLessons)

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


