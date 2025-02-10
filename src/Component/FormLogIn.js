import React from "react";
import axios from "axios";

class FormLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    document.title = "Login | TenseMap";
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://syntaxmap-back-p4ve.onrender.com/user/login", {
        user_password: this.state.password,
        user_email_address: this.state.email,
      })
      .then((response) => {
        console.log(response.data);

        // Store JWT token in localStorage
        localStorage.setItem("jstoken", response.data.jwt?.token);

        // Get today's date and format it
        let date = new Date();
        let formattedDate = date.getFullYear() + "-";
        let tmp = date.getMonth() + 1;
        formattedDate += tmp < 10 ? "0" + tmp : tmp;
        formattedDate += "-" + date.getDate();

        // Session handling
        let session = response.data.last_session;
        if (!session || session.split("_")[0] !== formattedDate) {
          session = formattedDate + "_1";
        } else {
          let next_session = parseInt(session.split("_")[1]) + 1;
          session = formattedDate + "_" + next_session;
        }

        // Store session in localStorage
        localStorage.setItem("session", session);

        // Redirect to the tensemap page
        window.location.replace("https://syntaxmap-front-2z2b.onrender.com");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        this.setState({
          error: "Invalid credentials. Please try again.",
        });
      });
  };

  render() {
    const { error } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            onChange={this.handleEmail}
            required
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            onChange={this.handlePassword}
            required
            style={styles.input}
          />
          <br />
          <input type="submit" value="Login" style={styles.submitBtn} />
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
    backgroundColor: "#007bff",
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

export default FormLogIn;
