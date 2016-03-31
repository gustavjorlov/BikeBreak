import React from 'react';

const ExerciseList = ({onExerciseLiked, exercises}) => {
    const renderExercise = (exercise) => {
        return (
            <div key={exercise.date} onClick={onExerciseLiked.bind(null, exercise.date)} className="exercise">
                <h3>{exercise.name}</h3>
                <p>{(new Date(exercise.date)).toLocaleString()}</p>
                <p>Likes: {exercise.likes}</p>
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
