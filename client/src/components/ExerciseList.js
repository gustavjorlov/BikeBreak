import React from 'react';

const ExerciseList = ({exercises}) => {
    const renderExercise = (exercise) => {
        return (
            <div key={exercise.date} className="exercise">
                <h3>{exercise.name}</h3>
                <p>{exercise.date}</p>
            </div>
        );
    }
    return (
        <div className="exercise_list">
            <h3>Loooong stateless list of exercises</h3>
            {exercises.map(renderExercise)}
        </div>
    )
}

export default ExerciseList;
