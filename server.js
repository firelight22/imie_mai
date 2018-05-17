// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  // Make sure you add the database name and not the collection name
<<<<<<< HEAD
  database = database.db("imie_mai");
=======
  database = database.db("local");
>>>>>>> bf84da129b654499d9fae3da57859e41d3007bce
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
