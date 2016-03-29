import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/Header.js';
import FileUpload from './components/FileUpload.js';
import ExerciseList from './components/ExerciseList.js';
import Footer from './components/Footer.js';

class Application extends React.Component{
    render(){
        return (
            <div className="application">
                <Header />
                <FileUpload />
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
