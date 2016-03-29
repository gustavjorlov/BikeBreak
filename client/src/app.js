import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/Header.js';
import FileUpload from './components/FileUpload.js';
import ExerciseList from './components/ExerciseList.js';
import Footer from './components/Footer.js';
import $ from 'jquery';

class Application extends React.Component{
    constructor(){
        super();
        this.getAllExercises((data) => {
            console.log(data);
            this.exercises = data;
        });
    }

    
    fileuploaded(filecontent){
        $.ajax({
            url:"http://localhost:1337/exercise",
            type:"POST",
            data: JSON.stringify({"exercise": filecontent}),
            contentType:"application/json; charset=utf-8",
            success: () => {
                console.log("Yeah too");
            }
        })
    }
    getAllExercises(callback){
        $.ajax({
            url: "http://localhost:1337/exercises",
            type: "GET",
            success: (data) => {
                callback(data);
            }
        })
    }
    render(){
        return (
            <div className="application">
                <Header />
                <FileUpload fileuploaded={this.fileuploaded} />
                <ExerciseList exercises={this.exercises} />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <Application />,
    document.getElementById('main')
);
