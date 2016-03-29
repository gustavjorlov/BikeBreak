const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';

MongoClient.connect(url, (err, db) => {
    console.log("Connected correctly to server.", err, db);
    insertExercise.bind(null, db);
});


export const insertExercise = (db, document, callback) => {
    db.collection('exercises').insertOne(document, (err, result) => {
        console.log("Inserted a document into the restaurants collection.", err, result);
        callback();
    });
};
