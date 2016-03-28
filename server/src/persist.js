const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';

MongoClient.connect(url, (err, db) => {
    console.log("Connected correctly to server.", err, db);
    insertDocument(db, () => {
        db.close();
    });
});


const insertDocument = (db, callback) => {
    db.collection('exercises').insertOne({
        "date": new Date(),
        "stuff": "things..."
    }, (err, result) => {
        console.log("Inserted a document into the restaurants collection.", err, result);
        callback();
    });
};
