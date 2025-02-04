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

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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
        window.location.replace(
          "https://syntaxmap-front-2z2b.onrender.com"
        );
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // You can handle the error here, maybe show a message to the user
      });
  };

  render() {
    const error =
      this.state.error.length > 0 ? <p>{this.state.error}</p> : null;
    return (
      <div className="login">
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="email" onChange={this.handleEmail} required />
          <br />
          <label>Password</label>
          <input type="password" onChange={this.handlePassword} required />
          <br />
          <label>Login</label>
          <input type="submit" />
          <br />
        </form>
        {error}
      </div>
    );
  }
}

export default FormLogIn;
