import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component{
    render(){
        return (
            <div class="application"></div>
        );
    }
}

ReactDOM.render(
    <Application />,
    document.getElementById('main')
);
