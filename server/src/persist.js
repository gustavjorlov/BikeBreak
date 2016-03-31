const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';
import Promise from 'promise';

const _insertExercise = (db, data, callback) => {
    db.collection('exercises').insertOne(data, (err, result) => {
        callback();
    });
};

const _getAllExercises = (db) => {
    return new Promise((resolve, reject) => {
        resolve(db.collection('exercises').find().toArray());
        // THIS SHOULD REALLY WORK
        // and I don't know why it doesn't
        // let cursor = db.collection('exercises').find();
        // console.log(Object.keys(cursor));
        // if(cursor.size() > 0){
        //     resolve(cursor.toArray());
        // }else{
        //     reject("no matches");
        // }
    });
}

export let insertExercise;
export let getAllExercises;

MongoClient.connect(url, (err, db) => {
    insertExercise = _insertExercise.bind(null, db);
    getAllExercises = _getAllExercises.bind(null, db);
    console.log("MongoClient.connect", err);
});
