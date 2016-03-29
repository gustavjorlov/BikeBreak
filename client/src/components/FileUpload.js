import React from 'react';

export default class FileUpload extends React.Component{

    handleSubmit(e){
        e.preventDefault();
    }

    handleFile(e){
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            console.log(upload.target.result);
        }
        reader.readAsText(file);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} method="post" action="/add" encType="multipart/form-data">
                <input type="file" name="image" onChange={this.handleFile} />
                <input type="submit" />
            </form>
        );
    }
}
