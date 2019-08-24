import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../actions/events'
import EventForm from './EventForm'

class EventFormContainer extends Component {
  state = {
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    location: '',
    imageUrl: '',
    errMessage: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.title !== '' && this.state.dateStart !== '' && this.state.dateEnd !== '' && this.state.imageUrl !== '') {
      const dataToSend = {
        title: this.state.title,
        dateStart: this.state.dateStart,
        dateEnd: this.state.dateEnd,
        imageUrl: this.state.imageUrl,
        location: this.state.location,
        description: this.state.description,
        userId: this.props.user.id
      }
      this.props.createEvent(dataToSend)
      this.setState({
        title: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        location: '',
        imageUrl: '',
        errMessage: ''
      }) 
      this.props.history.push('/')
    } else {
      this.setState({ errMessage: 'Please supply a valid title, date start, date end and image'})
    }
  }

  render() {
    return <EventForm
      user={this.props.user}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      values={this.state}
    />
  }
}

function mapStateToProps(state) {
  return {
    user: JSON.parse(localStorage.getItem('user'))
  }
}

const mapDispatchToProps = {
  createEvent
}



export default connect(mapStateToProps, mapDispatchToProps)(EventFormContainer)