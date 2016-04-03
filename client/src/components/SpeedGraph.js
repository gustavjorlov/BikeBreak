import React from 'react';
import d3 from 'd3';

export default class SpeedGraph extends React.Component{
    render(){
        return (<p>Graph {this.props.trackpoints.length}</p>);
    }
}
