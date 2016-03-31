import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/Header.js';
import FileUpload from './components/FileUpload.js';
import ExerciseList from './components/ExerciseList.js';
import Footer from './components/Footer.js';
import $ from 'jquery';
import {createStore} from 'redux';
import exerciseReducer from './reducers';
import {addExercise, likeExercise} from './actions';

let store = createStore(exerciseReducer);

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state = {exercises: []};
        this.props.store.subscribe(() => this.setState(this.props.store.getState().toJS()));
        this.getAllExercises((response) => {
            response.data.forEach((item) => this.props.store.dispatch(addExercise(item)));
        });
    }

    fileIsRead(filecontent){
        $.ajax({
            url:"http://localhost:1337/exercise",
            type:"POST",
            data: JSON.stringify({"exercise": filecontent}),
            contentType:"application/json; charset=utf-8",
            success: (response) => {
                if(response.err){ console.log(response.err); }else{
                    this.props.store.dispatch(addExercise(response.data));
                }
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
                <FileUpload fileRead={this.fileIsRead.bind(this)} />
                <ExerciseList exercises={this.state.exercises} />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <Application store={store} />,
    document.getElementById('main')
);
