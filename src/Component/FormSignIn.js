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

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    axios
      .post("https://syntaxmap-back-p4ve.onrender.com/user/register", {
        user_name: this.state.username,
        user_email_address: this.state.email,
      })
      .then((response) => {
        // Handle the response data
        this.setState({ error: response.data.msg });
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error during registration:", error);
        if (error.response) {
          // If the server responded with an error message
          this.setState({ error: error.response.data.msg });
        } else {
          // If no response was received
          this.setState({
            error: "Something went wrong, please try again later.",
          });
        }
      });
  };

  render() {
    const error =
      this.state.error.length > 0 ? <p>{this.state.error}</p> : null;
    return (
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" onChange={this.handleUsername} required />
          <br />
          <label>Email</label>
          <input type="email" onChange={this.handleEmail} required />
          <br />
          <label>Register</label>
          <input type="submit" />
          <br />
        </form>
        {error}
      </div>
    );
  }
}

export default FormSignIn;
