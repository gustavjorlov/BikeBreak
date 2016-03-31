// Action types

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const LIKE_EXERCISE = 'LIKE_EXERCISE';


// Action creators

export function addExercise(exercise){
    return {type: ADD_EXERCISE, exercise};
}

export function likeExercise(exercise_id){
    return {type: LIKE_EXERCISE, exercise_id};
}
