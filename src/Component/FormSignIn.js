import React from "react";
import axios from "axios";

class FormSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      error: "",
    };
  }

  componentDidMount() {
    document.title = "Register | TenseMap";
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://syntaxmap-back-p4ve.onrender.com/user/register", {
        user_name: this.state.username,
        user_email_address: this.state.email,
      })
      .then((response) => {
        this.setState({ error: response.data.msg });
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        if (error.response) {
          this.setState({ error: error.response.data.msg });
        } else {
          this.setState({
            error: "Something went wrong, please try again later.",
          });
        }
      });
  };

  render() {
    const { error } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            onChange={this.handleUsername}
            required
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Email</label>
          <input
            type="email"
            onChange={this.handleEmail}
            required
            style={styles.input}
          />
          <br />
          <input type="submit" value="Register" style={styles.submitBtn} />
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: "1rem",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1rem",
    marginTop: "15px",
  },
};

export default FormSignIn;
