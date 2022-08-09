const express = require('express')
const { ObjectId } = require('mongodb')
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
  const dbLessons = await db.collection("lessons").insertOne({title:"Web programming_101",
    subject:"web-development",
    process:"Building web applications.",
    developer:"Lucas Deez"})

//Add a conditional later
    res.send('You have inserted the following:' + JSON.stringify(dbLessons) + 'Go to the endpoint /database to access your newly inserted data.')
  console.log('You have inserted the following:' + JSON.stringify(dbLessons.length))

})

//Finding document by ObjectId.
//find({_id:ObjectId("62e9dd6492508eb3f2e82840")})
//Use different id numbers to check your queries.
/*In this use case we are looking for one specific document by ObjectId. We can perform
an update and delete action for that specific document. */
app.get("/database/findid", async (req, res) => {
  try {
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").find({_id:ObjectId("62edb2df817cac7d52e60aaf")}).toArray()
    console.log(JSON.stringify(dbLessons))

    if (dbLessons) {
      res.json("Object id:"+ JSON.stringify(dbLessons))
      console.log("Object id:"+ JSON.stringify(dbLessons))
    } 
  } catch (err) {
    console.log(err)
    res.json("Try again later. Not sure where the error occurred.")
  }
})

//Update Object or user id
app.get("/database/updateid", async (req, res) => {
  try {
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").updateOne({_id:ObjectId("62edb2df817cac7d52e60aaf")},{$set:{developer:"nelson marlow"}})
    console.log(JSON.stringify(dbLessons))

    if (dbLessons) {
      res.json("Updated"+ JSON.stringify(dbLessons)+ "go the /database endpoint to see your updated document")
      console.log("Updated "+ JSON.stringify(dbLessons))
    } 
  } catch (err) {
    console.log(err)
    res.json("Try again later. Not sure where the error occurred.")
  }
})



/*The D(Delete) in C.R.U.D. 
db.collection.deleteOne({_id:ObjectId("objectidrighthere")})
Delete the previous insertOne document
*/

app.get("/database/deleteid", async (req, res) => {
  
    const db = client.db('db101')
    const dbLessons = await db.collection("lessons").deleteOne({_id:ObjectId("62edb2df817cac7d52e60aaf")})

  //Add a conditional later
      res.send('You have deleted the following:' + JSON.stringify(dbLessons) + 'Go to the endpoint /database to view your current document.')
    console.log('You have inserted the following:' + JSON.stringify(dbLessons.length))

})




module.exports = app


