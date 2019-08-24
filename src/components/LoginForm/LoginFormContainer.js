import React from "react";
import { login } from "../../actions/users";
import { connect } from "react-redux";
import LogInForm from "./LoginForm";

class LoginFormContainer extends React.Component {
  state = {
    email: "",
    password: "",
    errMessage: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.login(this.state.email, this.state.password)
      this.setState({
        email: "",
        password: ""
      });
    } else {
      this.setState({ errMessage: 'Please supply a valid email and password'})
    }
  };

  render() {
    return <LogInForm
    user={this.props.user}
    handleSubmit={this.handleSubmit} 
    handleChange={this.handleChange} 
    values={this.state}
    />
  }
}

function MapStateToProps(state) {
  return {
    user: JSON.parse(localStorage.getItem('user'))
  };
}

export default connect(
  MapStateToProps,
  { login }
)(LoginFormContainer);
