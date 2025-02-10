import React from "react";
import axios from "axios";

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
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Add a Course</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleInput}
            style={styles.input}
          />

          <label style={styles.label}>Item</label>
          <input
            type="text"
            value={this.state.item}
            onChange={this.handleItemInput}
            style={styles.input}
          />

          <label style={styles.label}>Data</label>
          <input
            type="text"
            value={this.state.data}
            onChange={this.handleDataInput}
            style={styles.input}
          />

          <label style={styles.label}>Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={styles.fileInput}
          />

          <input type="submit" value="Add Course" style={styles.button} />
        </form>

        {this.state.response && (
          <p style={styles.response}>{this.state.response}</p>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  fileInput: {
    border: "none",
    fontSize: "1rem",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  response: {
    marginTop: "10px",
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
};

export default FormAddCourse;
