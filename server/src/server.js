import express from 'express';
import {getExcersize} from './filereader';

const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});


app.listen(1337, () => console.log('listening to 1337'));
