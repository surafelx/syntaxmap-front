import React, { Fragment } from "react";

class PageNotepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      words: [],
      wrongQuestionId: [],
      wrongQuestionText: [],
      notes: [],
      error: null, // For error handling
    };
  }

  componentDidMount() {
    document.title = "Notepad | TenseMap";
    this.fetchData();
  }

  fetchData() {
    const headers = {
      Authorization: localStorage.getItem("jstoken"),
    };

    // Fetching reports
    fetch("https://syntaxmap-back-p4ve.onrender.com/dashboard/user/", {
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const reports = res.dashboard.map((report) => report);
          this.setState({ reports });
        }
      })
      .catch((error) => this.setState({ error: "Failed to load reports" }));

    // Fetching words
    fetch("https://syntaxmap-back-p4ve.onrender.com/dictionnary/user/", {
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const words = res.dictionnary.map((word) => word);
          this.setState({ words });
        }
      })
      .catch((error) => this.setState({ error: "Failed to load words" }));

    // Fetching notes
    fetch("https://syntaxmap-back-p4ve.onrender.com/notepad/user/", { headers })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const notes = res.notepads.map((note) => note);
          this.setState({ notes });
        }
      })
      .catch((error) => this.setState({ error: "Failed to load notes" }));

    // Fetching wrong questions
    fetch("https://syntaxmap-back-p4ve.onrender.com/mistakeQuestion/user", {
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const mistakeQuestions = res.mistakeQuestions.map(
            (mistake) => mistake
          );
          let question_ids = mistakeQuestions
            .map((mistake) => mistake.questions_wrong_id.join())
            .join(",");
          this.setState({ wrongQuestionId: mistakeQuestions });

          // Fetching wrong question details
          fetch("https://syntaxmap-back-p4ve.onrender.com/questions/notepad", {
            method: "POST",
            body: JSON.stringify({ question_ids }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.getItem("jstoken"),
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                const wrongQuestions = res.questions.map(
                  (question) => question
                );
                this.setState({ wrongQuestionText: wrongQuestions });
              }
            })
            .catch((error) =>
              this.setState({ error: "Failed to load wrong questions" })
            );
        }
      })
      .catch((error) =>
        this.setState({ error: "Failed to load mistake questions" })
      );
  }

  handleNote = (e) => {
    console.log(e.target.value);
  };

  updateNote = (e) => {
    e.preventDefault();
    const note_id = e.target[0].value;
    const session_name = e.target[1].value;
    const note = e.target[2].value;

    fetch(`https://syntaxmap-back-p4ve.onrender.com/notepad/${note_id}`, {
      method: "PUT",
      body: JSON.stringify({
        note_id,
        session_name,
        note,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("jstoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          alert("Note updated successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: "Failed to update note" });
      });
  };

  render() {
    const { reports, words, wrongQuestionId, wrongQuestionText, notes, error } =
      this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Notepad</h2>
        {error && <div style={styles.error}>{error}</div>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Session</th>
              <th>Note</th>
              <th>Words</th>
              <th>Mistakes Question</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.session_name}</td>
                <td>
                  {notes.map((note, i) => {
                    if (note.session_name === report.session_name) {
                      return (
                        <form key={i} onSubmit={this.updateNote}>
                          <input type="hidden" value={note.note_id} />
                          <input type="hidden" value={note.session_name} />
                          <textarea
                            defaultValue={note.note}
                            onInput={this.handleNote}
                            style={styles.textarea}
                          />
                          <br />
                          <button type="submit" style={styles.button}>
                            Update Note
                          </button>
                        </form>
                      );
                    }
                    return null;
                  })}
                </td>
                <td>
                  {words.map((word, i) => {
                    if (word.session_name === report.session_name)
                      return <p key={i}>{word.word}</p>;
                    return null;
                  })}
                </td>
                <td>
                  {wrongQuestionId.map((mistake, i) => {
                    if (mistake.session_name === report.session_name) {
                      return wrongQuestionText.map((question, ind) => {
                        if (
                          mistake.questions_wrong_id.includes(
                            question.question_id
                          )
                        ) {
                          return (
                            <Fragment key={ind}>
                              <p>{question.question_title}</p>
                              <p>
                                a: {question.answer_title_a} b:{" "}
                                {question.answer_title_b} c:{" "}
                                {question.answer_title_c} d:{" "}
                                {question.answer_title_d}
                              </p>
                            </Fragment>
                          );
                        }
                        return null;
                      });
                    }
                    return null;
                  })}
                </td>
                <td>
                  score:{" "}
                  {((report.nb_good / report.total_question) * 100).toFixed(2)}%
                  time used:{" "}
                  {(
                    100 -
                    (report.time_remaining /
                      (report.time_per_question * report.total_question)) *
                      100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
  },
  error: {
    color: "red",
    marginBottom: "20px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default PageNotepad;
