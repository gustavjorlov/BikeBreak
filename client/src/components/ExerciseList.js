import React from 'react';

export default class ExerciseList extends React.Component{
    render(){
        console.log(this.props);
        return (
            <div className="exercise_list">
                <h3>Loooong list of exercises</h3>
            </div>
        )
    }
}
