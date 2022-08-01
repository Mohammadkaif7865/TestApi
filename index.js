let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;
// middleware(supporting lib)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
//1 for checking is server is on or not
app.get("/", (req, res) => {
  res.send("Express server is running");
});
//2 to check each collection
app.get("/Data", (req, res) => {
  db.collection("Data")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
//9 to Add data
app.post("/Data/Add", (req, res) => {
  db.collection("Data").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//3 to delete document from the collection
app.delete("/Data/:id", (req, res) => {
  db.collection("Data").deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(`Error While Connecting`);
  db = client.db("User");
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express Server listening on port ${port}`);
  });
});
