import express from 'express';
import {transformGPX} from './exerciseGPXParser.js';
import {insertExercise, getAllExercises} from './persist.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../../client/dist"));
const jsonParser = bodyParser.json({limit: '50mb'});

// app.use("/exercise", bodyParser.text());
app.post("/exercise", jsonParser, (req, res) => {
    // console.log(req.headers, Object.keys(req.body));
    transformGPX(req.body.exercise).then((exerciseData) => {
        insertExercise(exerciseData, () => {
            console.log("Inserted and all!");
            res.sendStatus(200);
        });
    }, () => {
        console.log(":(");
        res.sendStatus(500);
    });

});

app.get("/exercises", (req, res) => {
    getAllExercises().then((data) => {
        res.json(data);
    }, (err) => {
        console.log("GET /exercises", err);
        res.sendStatus(500);
    });
});


app.listen(1337, () => console.log('listening to 1337'));
