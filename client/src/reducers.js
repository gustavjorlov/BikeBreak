import {ADD_EXERCISE, LIKE_EXERCISE} from './actions';
import {List, Map} from 'immutable';

const initialState = Map({
    exercises: List()
});

function exerciseReducer(state = initialState, action){
    switch (action.type) {
        case ADD_EXERCISE:
            console.log("ADD_EXERCISE");
            return state.update('exercises', (item) => item.push(Map(action.exercise)));
        case LIKE_EXERCISE:
            console.log("LIKE_EXERCISE", action.exercise_id);
            // return state.updateIn(['exercises', action.exercise_id, 'likes'], (value) => {value + 1});
            return state.update('exercises', (list) => {
                return list.update(
                    list.findIndex((listItem) => listItem.get('date') === action.exercise_id),
                    (listItem) => listItem.set('likes', listItem.get('likes') + 1)
                );
            });
        default:
            return state;
    }
}

export default exerciseReducer;

// {
//     exercises: [
//         {
//             name: "gdsf",
//             date: "19 april",
//             trackpoints: [...],
//             likes: 21
//         },
//         {
//             name: "hrsd",
//             date: "2 mars",
//             trackpoints: [...],
//             likes: 3
//         }
//     ]
// }
