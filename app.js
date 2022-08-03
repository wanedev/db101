
const { json } = require('express')
const express = require('express')
const app = express()
const client = require("./db.js")
const db = client.db()

app.use(express.json())
app.use(express.urlencoded({extended:false}));


//The R(Read) in C.R.U.D. Specifically find all documents in the lessons collection.  
app.get("/database", async (req, res) => {
  try {
    //Await a connection to mongodb atlas
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").find({}).toArray()
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

//The R(Read) in C.R.U.D. Specifically find the documents where the subject is "database" or "server".
//Proceed to the route /database/subject in order to receive the query value for the subject key field.

app.get("/database/subject", async (req, res) => {
  try {
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").find({subject: "database"}).toArray()
    console.log(JSON.stringify(dbLessons))

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

/*The C(Create) in C.R.U.D. 
db.collection.InsertOne()
Insert a document into a collection.
*/
app.get("/database/create", async (req, res) => {
  
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").insertOne({title:"Shape drawing",
      subject:"Drawing",
      process:"Drawing basic shapes.",
      developer:"Lucas Deez"})

  //Add a conditional later
      res.send('You have inserted the following:' + JSON.stringify(dbLessons) + 'Go to the endpoint /database to access the post body')
    console.log('You have inserted the following:' + JSON.stringify(dbLessons.length))

})

/*The D(Delete) in C.R.U.D. 
db.collection.deleteOne()
Delete the previous insertOne document
*/

app.get("/database/delete", async (req, res) => {
  
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").deleteOne({title:"Shape drawing",
      subject:"Drawing",
      process:"Drawing basic shapes.",
      developer:"Lucas Deez"})

  //Add a conditional later
      res.send('You have deleted the following:' + JSON.stringify(dbLessons) + 'Go to the endpoint /database to view the newly removed document.')
    console.log('You have inserted the following:' + JSON.stringify(dbLessons.length))

})




module.exports = app


