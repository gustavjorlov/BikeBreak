import {ADD_EXERCISE, LIKE_EXERCISE} from './actions';
import {List, Map} from 'immutable';

const initialState = Map({
    exercises: List()
});

function exerciseReducer(state = initialState, action){
    switch (action.type) {
        case ADD_EXERCISE:
            console.log("ADD_EXERCISE");
            return state.update('exercises', (item) => item.push(action.exercise));
            break;
        case LIKE_EXERCISE:
            console.log("LIKE_EXERCISE: TBD");
            return state;
            break;
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
