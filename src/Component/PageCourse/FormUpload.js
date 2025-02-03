import React from "react";

class FormUpload extends React.Component {

    constructor(props){
        super(props);
        this.state={
            sentence: "",
            img: {}
        }
    }

  handleTextInput = e => {
    this.setState({sentence: e.target.value});
  }

  drawImageToCanvas(image) {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
      return canvas;
  }

  imgByteArray(image) {
    const canvas = this.drawImageToCanvas(image);
    const ctx = canvas.getContext('2d');
  
    let result = [];
    for (let y = 0; y < canvas.height; y++) {
      result.push([]);
      for (let x = 0; x < canvas.width; x++) {
        let data = ctx.getImageData(x, y, 1, 1).data;
        result[y].push(data[0]);
        result[y].push(data[1]);
        result[y].push(data[2]);
      }
    }
    this.setState({img: result});
  }

  handleImg = e => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]){
        this.setState({img: []})
        return;
        }
    const imageFile = URL.createObjectURL(e.target.files[0]);
    
    const image = document.createElement('img');
    image.onload = () => this.imgByteArray(image);
    image.setAttribute('src', imageFile);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    
    if (localStorage.getItem('jstoken') !== "") {
        fetch("http://localhost:8000" + "/userupload",{
        method: "POST",
        body: JSON.stringify({
            sentence: this.state.sentence,
            img: this.state.img,
            course_id: this.props.course_id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : localStorage.getItem('jstoken')
        }
        })
        .then(res =>res.json())
        .then((res) => {console.log(res); this.props.reload()})
        .catch((err) => {console.log(err)});
    }
    else {
        var jsonExemple = JSON.parse(localStorage.getItem("upload"))
        if (jsonExemple.upload.length < 3) {
            var data = {
                user_name: "foo",
                sentence: this.state.sentence,
                img: null,
                course_id: this.props.course_id
            };
            jsonExemple.upload.push(data);
            localStorage.setItem("upload", JSON.stringify(jsonExemple))
        }
    }
    this.props.reload()
  }

  render() {
    return (
     <div className="Upload">
        <h2>Upload your Exemples</h2>
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleTextInput}/><br/>
            <input type="file" onChange={this.handleImg} accept="image/png, image/jpeg, image/gif"/><br/>
            <input type="submit"/><br/>
        </form>
     </div>
    );
  }
}

export default FormUpload;