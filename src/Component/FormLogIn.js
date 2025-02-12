import React from "react";
import axios from "axios";
import {
  NavLogo,
} from "./Navbar/NavbarElements";
import logo from "../img/LC-1.jpg";

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
    document.title = "Login | Syntax Map";
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://syntaxmap-back-p4ve.onrender.com/user/login", {
        user_email_address: this.state.email,
        user_password: this.state.password,
      });

      localStorage.setItem("jstoken", response.data.jwt?.token);
      let date = new Date();
      let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate()}`;
      let session = response.data.last_session;
      session =
        session && session.startsWith(formattedDate)
          ? `${formattedDate}_${parseInt(session.split("_")[1]) + 1}`
          : `${formattedDate}_1`;

      localStorage.setItem("session", session);
      window.location.replace("https://syntaxmap-front-2z2b.onrender.com");
    } catch (error) {
      console.error("Error during login:", error);
      this.setState({ error: "Invalid credentials. Please try again." });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div style={styles.background}>
        <div style={styles.container}>
          <NavLogo to="/">
            <img
              src={logo}
              style={{
                height: "120px",
                maxWidth: "100%",
                verticalAlign: "middle",
              }}
            />
          </NavLogo>
          <h2 style={styles.title}>Syntax Map</h2>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              required
              style={styles.input}
            />
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.submitBtn}>
              Login
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }
}

const styles = {
  background: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
  },
  container: {
    width: "350px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  logo: {
    width: "100px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#2575fc",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1rem",
    color: "#333",
    textAlign: "left",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#2575fc",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  submitBtnHover: {
    backgroundColor: "#1a5edb",
  },
  error: {
    color: "red",
    fontSize: "1rem",
    marginTop: "15px",
  },
};

export default FormLogIn;
