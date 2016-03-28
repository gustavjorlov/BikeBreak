const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';

MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server.", err, db);
    db.close();
});
