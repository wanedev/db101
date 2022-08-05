# DATABASE CONNECTION. (Mongodb)

In this demonstration we will connect to the mongodb atlas cloud database. We are using the mongodb driver to communicate with atlas in order to query and perform various database methods. Their are other of ways to connect to mongodb, but I choose this specific configuration. The following configuration will establish a connection to our database first before our application loads. 

---

## ___Instructions: Mongodb___

- Sign up to create a mongodb atlas account if you haven't already. 

- Go to the mongodb documentation for basic instructions on how to use mongodb to get an overview of what is possible. 

- Make sure you have your connection string so you can store it inside your .env file.

---

## ___Instructions: Project setup___

Install the following npm packages
```
npm i express mongodb dotenv

```

If you have not cloned this project only, npm install the three basic packages that we will need to allow for our server, database connection, and hiding our connection string. 

---

If you have cloned this demo project, then run npm install,for the necessary development dependencies for this demo app. 
```
npm install
```
---





The following script below will run the db file with nodemon
>npm run dbDev

or

The following script below will run the db file without nodemon
>npm run db


---

## ___END POINTS/___

___Available endpoints.___

---

/database

/database/subject

/database/create

/database/delete

---

___**NOTE:**___
This is an ongoing file due to ideals and experiments, things are subject to change. A brief outline on how to use the mongodb methods and queries. Most likely you wouldn't use the GET http verb with every mongodb method.  For example, when you insertOne( ) you commonly would use post in correlation with that particular http verb when it comes to form submissions or any other body request. Teaching and learning as I go. 


Developer: Wanedev