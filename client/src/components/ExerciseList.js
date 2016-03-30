import React from 'react';

export default class ExerciseList extends React.Component{
    renderExercise(exercise){
        return (
            <div key={exercise.date} className="exercise">
                <h3>{exercise.name}</h3>
                <p>{exercise.date}</p>
            </div>
        );
    }
    render(){
        console.log(this.props);
        return (
            <div className="exercise_list">
                <h3>Loooong list of exercises</h3>
                {this.props.exercises.map(this.renderExercise)}
            </div>
        )
    }
}
