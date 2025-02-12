import React from "react";

class FormUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      img: {},
    };
  }

  handleTextInput = (e) => {
    this.setState({ sentence: e.target.value });
  };

  drawImageToCanvas(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
    return canvas;
  }

  imgByteArray(image) {
    const canvas = this.drawImageToCanvas(image);
    const ctx = canvas.getContext("2d");

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
    this.setState({ img: result });
  }

  handleImg = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      this.setState({ img: [] });
      return;
    }
    const imageFile = URL.createObjectURL(e.target.files[0]);

    const image = document.createElement("img");
    image.onload = () => this.imgByteArray(image);
    image.setAttribute("src", imageFile);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    if (localStorage.getItem("jstoken") !== "") {
      fetch("https://syntaxmap-back-p4ve.onrender.com" + "/userupload", {
        method: "POST",
        body: JSON.stringify({
          sentence: this.state.sentence,
          img: this.state.img,
          course_id: this.props.course_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.props.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var jsonExemple = JSON.parse(localStorage.getItem("upload"));
      if (jsonExemple.upload.length < 3) {
        var data = {
          user_name: "foo",
          sentence: this.state.sentence,
          img: null,
          course_id: this.props.course_id,
        };
        jsonExemple.upload.push(data);
        localStorage.setItem("upload", JSON.stringify(jsonExemple));
      }
    }
    this.props.reload();
  };

  render() {
    return (
      <div style={styles.uploadContainer}>
        <h2 style={styles.title}>Upload your Examples</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="text"
            onChange={this.handleTextInput}
            placeholder="Enter your example"
            style={styles.input}
          />
          {/* <br /> */}
          {/* <input
            type="file"
            onChange={this.handleImg}
            accept="image/png, image/jpeg, image/gif"
            style={styles.inputFile}
          /> */}
          <br />
          <input type="submit" value="Submit" style={styles.submitBtn} />
          <br />
        </form>
      </div>
    );
  }
}

const styles = {
  uploadContainer: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    width: "80%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  inputFile: {
    marginBottom: "20px",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default FormUpload;
