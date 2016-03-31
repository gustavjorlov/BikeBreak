import express from 'express';
import {transformGPX} from './exerciseGPXParser.js';
import {insertExercise, getAllExercises, likeExercise} from './persist.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../../client/dist"));
const jsonParser = bodyParser.json({limit: '50mb'});

app.post("/exercise/create", jsonParser, (req, res) => {
    transformGPX(req.body.exercise).then((exerciseData) => {
        insertExercise(exerciseData).then(() => {
            res.json({
                err: null,
                data: {
                    name: exerciseData.name,
                    date: exerciseData.date,
                    trackpoints: exerciseData.trackpoints,
                    likes: exerciseData.likes
                }
            });
        }, (err) => sendError(res, err));
    }, (err) => sendError(res, err));
});

app.post("/exercise/update/likes", jsonParser, (req, res) => {
    likeExercise(req.body.date).then((likedExercise) => {
        res.json({
            err: null,
            data: likedExercise
        });
    }, (err) => sendError(res, err));
});

app.get("/exercises", (req, res) => {
    getAllExercises().then((data) => {
        res.json({
            err: null,
            data: data
        });
    }, (err) => sendError(res, err));
});

const sendError = (res, err) => res.json({ err: err, data: null });

app.listen(1337, () => console.log('listening to 1337'));
