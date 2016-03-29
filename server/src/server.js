import express from 'express';
import {getExcersize} from './filereader';
import {insertExercise} from './persist.js';
import busboy from 'connect-busboy';

const app = express();
app.use(busboy());

app.use(function(req, res) {
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log("Got a file", fieldname, file, filename, encoding, mimetype);
    });
});

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/exercise", (req, res) => {
    // upload file
    // parse file
    // store exercise in database
});

app.get("/exercises", (req, res) => {
    db.getAllTheStuff().then((stuff) => {
        res.json(stuff);
    }, (err) => {
        res.sendStatus(500);
    });
});


app.listen(1337, () => console.log('listening to 1337'));
