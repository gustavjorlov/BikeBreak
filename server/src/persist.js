const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';

const _insertExercise = (db, data, callback) => {
    console.log("insertExercise", Object.keys(db), Object.keys(data));
    db.collection('exercises').insertOne(data, (err, result) => {
        console.log("Inserted a document into the restaurants collection.", err, result);
        callback();
    });
};

export let insertExercise;

MongoClient.connect(url, (err, db) => {
    insertExercise = _insertExercise.bind(null, db);
    console.log("MongoClient.connect", err);
});
