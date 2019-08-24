import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTicket } from '../../actions/tickets'
import TicketForm from './TicketForm'

class TicketFormContainer extends Component {
  state = {
    price: '',
    description: '',
    quantity: 1,
    errMessage: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.price !== '' && this.state.description !== '') {
      const dataToSend = {
        price: this.state.price,
        description: this.state.description,
        quantity: this.state.quantity,
        userId: this.props.user.id,
        eventId: Number(this.props.match.params.id)
      }
      this.props.createTicket(dataToSend)
      this.setState({
        price: '',
        description: '',
        quantity: 1,
        errMessage: ''
      })
      this.props.history.push(`/event/${Number(this.props.match.params.id)}`)
    } else {
      this.setState({ errMessage: 'Please supply a valid price and description'})
    }
  }

  render() {
    return <TicketForm
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
  createTicket
}



export default connect(mapStateToProps, mapDispatchToProps)(TicketFormContainer)