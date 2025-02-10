import React, { Component } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: [],
      courseContent: this.props.course.split("\n"),
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchExamples();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reload !== this.props.reload && this.props.reload) {
      this.fetchExamples();
    }
  }

  // API Call to fetch examples
  fetchExamples = () => {
    this.setState({ loading: true });
    let examples = [];

    if (localStorage.getItem("jstoken")) {
      fetch(
        "https://syntaxmap-back-p4ve.onrender.com/userupload/user/" +
          this.props.course_id,
        {
          headers: {
            Authorization: localStorage.getItem("jstoken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            examples = data.userUploads.map((upload) => upload.sentence);
            this.setState({ examples, loading: false });
          }
        })
        .catch((err) => {
          console.error(err);
          this.setState({ error: "Failed to fetch examples", loading: false });
        });
    } else {
      const jsonExamples = JSON.parse(localStorage.getItem("upload"));
      if (jsonExamples) {
        examples = jsonExamples.upload
          .filter((item) => item.course_id === this.props.course_id)
          .map((item) => item.sentence);
        this.setState({ examples, loading: false });
      } else {
        this.setState({ error: "No local examples found", loading: false });
      }
    }
  };

  // Handle exam button click
  handleApply = () => {
    this.props.onClick();
  };

  render() {
    const { courseContent, examples, loading, error } = this.state;

    return (
      <div style={styles.courseContainer}>
        <h2 style={styles.courseTitle}>{this.props.title}</h2>
        <hr style={styles.divider} />

        {courseContent.map((part, index) => (
          <p key={index} style={styles.coursePart}>
            {part}
          </p>
        ))}

        <hr style={styles.divider} />

        <h3 style={styles.sectionTitle}>Your Examples</h3>

        {loading ? (
          <p>Loading examples...</p>
        ) : error ? (
          <p style={styles.errorMessage}>{error}</p>
        ) : examples.length > 0 ? (
          examples.map((example, index) => (
            <p key={index} style={styles.exampleText}>
              {example}
            </p>
          ))
        ) : (
          <p>No examples available</p>
        )}

        {/* Button & Link */}
        <div style={styles.buttonContainer}>
          <Link
            to={{
              pathname: "/quiz/" + this.props.title,
              state: { course_id: this.props.course_id },
            }}
            style={styles.examLink}
          >
            Go to Exam
          </Link>
        </div>
      </div>
    );
  }
}

const styles = {
  courseContainer: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  courseTitle: {
    fontSize: "2rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  divider: {
    border: "1px solid #ddd",
    margin: "20px 0",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#444",
  },
  exampleText: {
    fontSize: "1rem",
    color: "#555",
    margin: "10px 0",
  },
  coursePart: {
    fontSize: "1.1rem",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  examLink: {
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#e74c3c",
    fontSize: "1rem",
    margin: "15px 0",
    textAlign: "center",
  },
};

export default Course;
