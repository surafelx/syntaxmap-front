import React from "react";
import FormAddCourse from "./FormAddCourse.js";

class PageCourseMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Courses: [],
      delete: false,
      courseIdDelete: -1,
      courseItemDelete: "",
      courseTitleDelete: "",
    };
  }

  componentDidMount() {
    document.title = "Add Course | TenseMap";
    fetch("https://syntaxmap-back-p4ve.onrender.com/course")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ Courses: res.courses });
      })
      .catch((err) => console.log(err));
  }

  updateCourse = (e) => {
    e.preventDefault();
    fetch(
      `https://syntaxmap-back-p4ve.onrender.com/course/${e.target[0].value}`,
      {
        method: "PUT",
        body: JSON.stringify({
          course_id: e.target[0].value,
          course_item: e.target[1].value,
          course_title: e.target[2].value,
          course_data: e.target[3].value,
          course_image: null,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  confirm(course_id, course_item, course_title) {
    this.setState({
      courseIdDelete: course_id,
      courseItemDelete: course_item,
      courseTitleDelete: course_title,
      delete: true,
    });
  }

  delete() {
    fetch(
      `https://syntaxmap-back-p4ve.onrender.com/course/${this.state.courseIdDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({ delete: false, courseIdDelete: -1 });
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Course Management</h2>

          {/* Courses Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Update</th>
                  <th style={styles.th}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Courses.map((course, index) => (
                  <tr
                    key={index}
                    style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td style={styles.td}>{course.course_id}</td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        defaultValue={course.course_item}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        defaultValue={course.course_title}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <textarea
                        defaultValue={course.course_data}
                        style={styles.textarea}
                      />
                    </td>
                    <td style={styles.td}>{course.course_image || "N/A"}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.updateButton}
                        onClick={this.updateCourse}
                      >
                        Update
                      </button>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.deleteButton}
                        onClick={() =>
                          this.confirm(
                            course.course_id,
                            course.course_item,
                            course.course_title
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Modal */}
          {this.state.delete && (
            <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h3 style={styles.modalTitle}>Confirm Delete</h3>
                <p style={styles.modalText}>
                  Are you sure you want to delete the course{" "}
                  <strong>{this.state.courseTitleDelete}</strong>?
                </p>
                <div style={styles.modalButtons}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => this.delete()}
                  >
                    Yes, Delete
                  </button>
                  <button
                    style={styles.cancelButton}
                    onClick={() => this.setState({ delete: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <FormAddCourse />
        </div>
      </div>
    );
  }
}

const styles = {
  container: { padding: "24px" },
  card: {
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "24px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  tableHeader: { backgroundColor: "#f3f4f6", color: "#333", textAlign: "left" },
  th: { padding: "12px", borderBottom: "1px solid #ddd" },
  td: { padding: "12px", borderBottom: "1px solid #ddd" },
  oddRow: { backgroundColor: "white" },
  evenRow: { backgroundColor: "#f9fafb" },
  input: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "6px",
    width: "100%",
  },
  textarea: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "6px",
    width: "100%",
  },
  updateButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "24px",
    width: "300px",
    textAlign: "center",
  },
  modalTitle: { fontSize: "18px", fontWeight: "600", color: "#333" },
  modalText: { color: "#555", marginTop: "10px" },
  modalButtons: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
  },
};

export default PageCourseMod;
