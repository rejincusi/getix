import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'
import SignupForm from './SignupForm'

class SignupFormContainer extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errMessage: '',
    imageUrl: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.email !== '' && this.state.password !== '' && this.state.name !== '') {
      this.props.signup(this.state.email, this.state.password, this.state.name, this.state.imageUrl)
      this.setState({
        email: '',
        password: '',
        name: '',
        errMessage: '',
        imageUrl: ''
      })
    } else {
      this.setState({ errMessage: 'Please supply a valid email, password and name'})
    }
  }

  render() {
    return <SignupForm
      user={this.props.user}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      values={this.state}
    />
  }
}

function mapStateToProps(state) {
  return {
    user:state.user
  }
}

const mapDispatchToProps = {
  signup
}



export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer)