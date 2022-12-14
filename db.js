const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv")
dotenv.config()


MongoClient.connect(process.env.MONGO_URI, { serverApi: ServerApiVersion.v1}, (err, client)=> {
  module.exports = client
  const app = require("./app.js")
  app.listen(process.env.port || 3000)
  console.log('db connected' + 'Current server api version:' + JSON.stringify(ServerApiVersion))
  console.log(ServerApiVersion)
})
