import React from 'react';

export default class FileUpload extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.getElementsByClassName("myfile")[0].files[0];

        reader.readAsText(file);
        reader.onload = (upload) => {
            this.props.fileRead(upload.target.result);
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)} method="post" action="/add" encType="multipart/form-data">
                <input type="file" className="myfile" />
                <input type="submit" />
            </form>
        );
    }
}
