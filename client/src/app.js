import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/Header.js';
import FileUpload from './components/FileUpload.js';
import ExerciseList from './components/ExerciseList.js';
import Footer from './components/Footer.js';
import $ from 'jquery';

class Application extends React.Component{
    fileuploaded(filecontent){
        console.log("fileuploaded", filecontent.length);
        $.post("http://localhost:1337/exercise", filecontent, () => {
            console.log("Yeah");
        });
    }
    render(){
        return (
            <div className="application">
                <Header />
                <FileUpload fileuploaded={this.fileuploaded} />
                <ExerciseList />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <Application />,
    document.getElementById('main')
);
