import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/Header.js';
import FileUpload from './components/FileUpload.js';
import ExerciseList from './components/ExerciseList.js';
import Footer from './components/Footer.js';
import $ from 'jquery';

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state = {exercises: []};
        this.getAllExercises((data) => {
            this.setState({ exercises: data });
        });
    }

    fileRead(filecontent){
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
        $.ajax({ url: "http://localhost:1337/exercises", type: "GET", success: callback });
    }
    render(){
        return (
            <div className="application">
                <Header />
                <FileUpload fileRead={this.fileRead} />
                <ExerciseList exercises={this.state.exercises} />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <Application />,
    document.getElementById('main')
);
