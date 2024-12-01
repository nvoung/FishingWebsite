var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);

let db;

async function startServer() {
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
  });
}

startServer();

app.get("/listproducts", async (req, res) => {
  console.log("Node connected successfully to GET MongoDB");

  const query = {};
  const results = await db.collection("Final").find(query).limit(100).toArray();
  console.log(results);

  res.status(200).send(results);
});

app.get("/listcategories", async (req, res) => {
    console.log("Node connected successfully to GET MongoDB");
  
    try {
      const categories = await db.collection("Final").distinct("category");
      console.log(categories);
  
      res.status(200).send(categories);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  