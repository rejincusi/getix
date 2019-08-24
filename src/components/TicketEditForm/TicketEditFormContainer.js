import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTicket, loadTicket } from '../../actions/tickets'
import TicketEditForm from './TicketEditForm'

class TicketEditFormContainer extends Component {
  state = {
    price: '',
    description: '',
    quantity: 1,
    errMessage: ''
  }

  getTicketDetails = async (id) => {
    await this.props.loadTicket(Number(id))
    return true
  }

  componentDidMount() {
    this.getTicketDetails(this.props.match.params.ticketId).then(() => {
      this.setState({
        price: this.props.ticket.price,
        description: this.props.ticket.description,
        quantity: this.props.ticket.quantity
      })  
    })
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
      this.props.updateTicket(this.props.match.params.ticketId, dataToSend)
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
    return <TicketEditForm
      user={this.props.user}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      values={this.state}
    />
  }
}

function mapStateToProps(state) {
  return {
    user: JSON.parse(localStorage.getItem('user')),
    ticket: state.ticket
  }
}

const mapDispatchToProps = {
  updateTicket,
  loadTicket
}



export default connect(mapStateToProps, mapDispatchToProps)(TicketEditFormContainer)