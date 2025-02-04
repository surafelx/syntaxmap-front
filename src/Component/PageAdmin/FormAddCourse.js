import React from "react";
import axios from "axios"

class FormAddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      item: "",
      data: "",
      image: null,
      response: "",
    };
  }

  handleTitleInput = (e) => {
    this.setState({ title: e.target.value, response: "" });
  };
  handleItemInput = (e) => {
    this.setState({ item: e.target.value, response: "" });
  };
  handleDataInput = (e) => {
    this.setState({ data: e.target.value, response: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    //if (localStorage.getItem('jstoken') !== "") {
    axios
      .post(
        "https://syntaxmap-back-p4ve.onrender.com/course",
        {
          course_title: this.state.title,
          course_item: this.state.item,
          course_image: this.state.image,
          course_data: this.state.data,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.getItem("jstoken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          response: "Last course added: " + this.state.item,
          title: "",
          data: "",
          item: "",
        });
      })
      .catch((error) => {
        console.error("Error during course creation:", error);
      });
    //}
  };

  render() {
    return (
      <div className="Upload">
        <h2>Add a course</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleInput}
          />
          <br />
          <label>Item</label>
          <input
            type="text"
            value={this.state.item}
            onChange={this.handleItemInput}
          />
          <br />
          <label>Data</label>
          <input
            type="text"
            value={this.state.data}
            onChange={this.handleDataInput}
          />
          <br />
          <label>Image</label>
          <input type="file" accept="image/png, image/jpeg, image/gif" />
          <br />
          <input type="submit" />
          <br />
        </form>
        {this.state.response}
      </div>
    );
  }
}

export default FormAddCourse;
