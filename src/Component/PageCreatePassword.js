import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class PageCreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      checkPassword: "",
      error: "",
      token: this.props.match.params.token,
    };
  }

  componentDidUpdate() {}

  componentDidMount() {
    axios
      .get("https://syntaxmap-back-p4ve.onrender.com/token/check", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.state.token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during token check:", error);
      });
  }

  handleConfirmPassword = (e) => {
    this.setState({ checkPassword: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      axios
        .post(
          "https://syntaxmap-back-p4ve.onrender.com/user/password",
          {
            user_password: this.state.password,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: "Bearer " + this.state.token,
            },
          }
        )
        .then((response) => {
          this.setState({ error: "You can log in" });
          this.props.history.push("/login_register");
        })
        .catch((error) => {
          console.error("Error during password update:", error);
          this.setState({ error: "An error occurred. Please try again." });
        });
    } else {
      this.setState({ error: "Passwords must be identical" });
    }
  };

  render() {
    const error =
      this.state.error.length > 0 ? <p>{this.state.error}</p> : null;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Password</label>
          <input type="Password" onChange={this.handlePassword} required />
          <br />
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={this.handleConfirmPassword}
            required
          />
          <br />
          <input type="submit" />
          <br />
        </form>
        {error}
      </div>
    );
  }
}

export default withRouter(PageCreatePassword);
