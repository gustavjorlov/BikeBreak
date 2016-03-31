const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/bikebreak';
import Promise from 'promise';

const _insertExercise = (db, data) => {
    return new Promise((resolve, reject) => {
        db.collection('exercises').findOne({'date': data.date}, (err, doc) => {
            if(!doc){
                db.collection('exercises').insertOne(data, (err, result) => {
                    resolve(data);
                });
            }else{
                reject("Already in the database");
            }
        });
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

const _likeExercise = (db, date) => {
    return new Promise((resolve, reject) => {
        db.collection('exercises').update({'date': date}, {$inc: {'likes': 1}}, (err, result) => {
            if(err){ reject(err); }else{
                resolve(result);
            }
        });
    });
}

export let insertExercise;
export let getAllExercises;
export let likeExercise;

MongoClient.connect(url, (err, db) => {
    insertExercise = _insertExercise.bind(null, db);
    getAllExercises = _getAllExercises.bind(null, db);
    likeExercise = _likeExercise.bind(null, db);
    console.log("MongoClient.connect", err);
});
