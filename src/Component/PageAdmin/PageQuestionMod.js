import React from "react";
import FormAddQuestion from "./FormAddQuestion.js";
import Button from "../Button.js";

class PageQuestionMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Questions: [],
      QuestionsFiltered: [],
      delete: false,
      page: 1,
      nbQuestionsPrinted: 100,
      questionIdDelete: -1,
      questionItemDelete: "",
      questionTitleDelete: "",
      titleFilter: "",
      itemFilter: "",
      difficultyFilter: "",
      update: false,
      verifiedFilter: true,
      errorMessage: "", // For error feedback
    };
  }

  componentDidUpdate() {
    if (this.state.update) {
      var tmp = [];
      this.state.Questions.map((question) => {
        if (this.filter(question)) tmp.push(question);
        return null;
      });
      this.setState({ QuestionsFiltered: tmp, update: false });
    }
  }

  componentDidMount() {
    document.title = "Add Question | TenseMap";
    fetch("https://syntaxmap-back-p4ve.onrender.com" + "/quiz")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          Questions: res.questions,
          QuestionsFiltered: res.questions,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: "Failed to fetch data. Please try again later.",
        });
      });
  }

  updateQuestion = (e) => {
    e.preventDefault();
    fetch(
      "https://syntaxmap-back-p4ve.onrender.com" + "/quiz/" + e.target[0].value,
      {
        method: "PUT",
        body: JSON.stringify({
          question_id: e.target[0].value,
          online_exam_ids: e.target[1].value,
          question_title: e.target[2].value,
          answer_title_a: e.target[3].value,
          answer_title_b: e.target[4].value,
          answer_title_c: e.target[5].value,
          answer_title_d: e.target[6].value,
          right_answer: e.target[7].value,
          difficulty: e.target[8].value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: "Failed to update question. Please try again later.",
        });
      });
  };

  confirm(question_id, question_item, question_title) {
    this.setState({
      questionIdDelete: question_id,
      questionItemDelete: question_item,
      questionTitleDelete: question_title,
      delete: true,
    });
  }

  delete() {
    fetch(
      "https://syntaxmap-back-p4ve.onrender.com" +
        "/quiz/" +
        this.state.questionIdDelete,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ delete: false, questionIdDelete: -1 });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: "Failed to delete question. Please try again later.",
        });
      });
  }

  filter(question) {
    let cond = true;
    if (this.state.difficultyFilter)
      cond = this.state.difficultyFilter === question.difficulty;
    if (this.state.itemFilter && question.online_exam_ids) {
      cond =
        cond && question.online_exam_ids.join().includes(this.state.itemFilter);
    }
    cond = cond && question.question_title.includes(this.state.titleFilter);
    cond = cond && question.verified === this.state.verifiedFilter;
    return cond;
  }

  titleFilter = (e) => {
    this.setState({ titleFilter: e.target.value, update: true });
  };
  difficultyFilter = (e) => {
    this.setState({ difficultyFilter: e.target.value, update: true });
  };
  itemFilter = (e) => {
    this.setState({ itemFilter: e.target.value, update: true });
  };
  verifiedFilter = (e) => {
    this.setState({ verifiedFilter: !this.state.verifiedFilter, update: true });
  };

  render() {
    const styles = {
      container: {
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      },
      filterContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      },
      input: {
        padding: "8px",
        marginTop: "5px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "14px",
      },
      table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      },
      th: {
        backgroundColor: "#f0f0f0",
        padding: "12px",
        textAlign: "left",
      },
      td: {
        padding: "8px",
        borderBottom: "1px solid #ddd",
      },
      errorMessage: {
        color: "red",
        marginTop: "20px",
        fontWeight: "bold",
      },
      button: {
        padding: "10px 20px",
        margin: "5px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      },
      buttonDisabled: {
        backgroundColor: "#cccccc",
        cursor: "not-allowed",
      },
    };

    const deletePopup = this.state.delete ? (
      <div>
        <p>
          Do you want to delete this question {this.state.questionIdDelete}{" "}
          {this.state.questionItemDelete} {this.state.questionTitleDelete}?
        </p>
        <Button
          isDisable={false}
          value="Yes"
          onClick={() => this.delete()}
          name="Delete"
          style={styles.button}
        />
        <Button
          isDisable={false}
          value="No"
          onClick={() => this.setState({ delete: false, questionIdDelete: -1 })}
          name="Delete"
          style={styles.button}
        />
      </div>
    ) : null;

    return (
      <div style={styles.container}>
        {this.state.errorMessage && (
          <div style={styles.errorMessage}>{this.state.errorMessage}</div>
        )}
        <FormAddQuestion />
        <div className="Question">
          <h4>Filter :</h4>
          <div style={styles.filterContainer}>
            <label>Questions contain:</label>
            <input
              style={styles.input}
              type="text"
              onChange={this.titleFilter}
            />
            <label>Difficulty:</label>
            <input
              style={styles.input}
              type="text"
              onChange={this.difficultyFilter}
            />
            <label>Items:</label>
            <input
              style={styles.input}
              type="text"
              onChange={this.itemFilter}
            />
            <label>Verified:</label>
            <input
              style={styles.input}
              type="checkbox"
              checked={this.state.verifiedFilter}
              onChange={this.verifiedFilter}
            />
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Id</th>
                <th style={styles.th}>Ids Item</th>
                <th style={styles.th}>Question</th>
                <th style={styles.th}>Answer A</th>
                <th style={styles.th}>Answer B</th>
                <th style={styles.th}>Answer C</th>
                <th style={styles.th}>Answer D</th>
                <th style={styles.th}>Right Answer</th>
                <th style={styles.th}>Difficulty</th>
                <th style={styles.th}>Verified</th>
                <th style={styles.th}>Update</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.QuestionsFiltered.map((question, index) => {
                const print =
                  this.state.questionIdDelete === question.question_id
                    ? deletePopup
                    : null;
                if (
                  index < this.state.page * this.state.nbQuestionsPrinted &&
                  index >=
                    (this.state.page - 1) * this.state.nbQuestionsPrinted &&
                  !this.state.update
                ) {
                  return (
                    <tr key={index}>
                      <td style={styles.td}>
                        <form id={index} onSubmit={this.updateQuestion}></form>
                        <input
                          form={index}
                          type="hidden"
                          value={question.question_id}
                        />
                        {question.question_id}
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="hidden"
                          value={question.online_exam_ids}
                        />
                        {question.online_exam_ids
                          ? question.online_exam_ids.join()
                          : null}
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.question_title}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.answer_title_a}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.answer_title_b}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.answer_title_c}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.answer_title_d}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.right_answer}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="text"
                          defaultValue={question.difficulty}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="checkbox"
                          checked={question.verified}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          form={index}
                          type="submit"
                          style={styles.button}
                        />
                      </td>
                      <td style={styles.td}>
                        <Button
                          isDisable={false}
                          value="delete"
                          onClick={() =>
                            this.confirm(
                              question.question_id,
                              question.question_item,
                              question.question_title
                            )
                          }
                          name="Delete"
                          style={styles.button}
                        />
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          <div>
            <Button
              value="<"
              isDisable={this.state.page === 1 ? true : false}
              onClick={() => this.setState({ page: this.state.page - 1 })}
              name="Back"
              style={
                this.state.page === 1 ? styles.buttonDisabled : styles.button
              }
            />
            {this.state.page} /{" "}
            {Math.floor(
              this.state.QuestionsFiltered.length /
                this.state.nbQuestionsPrinted +
                1
            )}
            <Button
              value=">"
              isDisable={
                this.state.page ===
                Math.floor(
                  this.state.QuestionsFiltered.length /
                    this.state.nbQuestionsPrinted +
                    1
                )
                  ? true
                  : false
              }
              onClick={() => this.setState({ page: this.state.page + 1 })}
              name="Next"
              style={
                this.state.page ===
                Math.floor(
                  this.state.QuestionsFiltered.length /
                    this.state.nbQuestionsPrinted +
                    1
                )
                  ? styles.buttonDisabled
                  : styles.button
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PageQuestionMod;
