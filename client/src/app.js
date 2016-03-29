import ReactDOM from 'react-dom';
import React from 'react';
import FileUpload from './components/FileUpload.js';

class Application extends React.Component{
    render(){
        return (
            <div className="application">
                <FileUpload />
            </div>
        );
    }
}


ReactDOM.render(
    <Application />,
    document.getElementById('main')
);
