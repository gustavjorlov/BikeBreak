import express from 'express';
import {getExcersize} from './filereader';
import * as db from './persist.js';

const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/exercises", (req, res) => {
    db.getAllTheStuff().then((stuff) => {
        res.json(stuff);
    }, {
        res.sendStatus(500);
    });
});


app.listen(1337, () => console.log('listening to 1337'));
