import React from 'react';

export default class SpeedGraph extends React.Component{
    render(){
        return (<p>Graph {this.props.trackpoints.length}</p>);
    }
}
