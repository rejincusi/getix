import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvent } from '../../actions/events'
import { loadTicket } from '../../actions/tickets'
import { createComment, getComments } from '../../actions/comments'
import TicketDetails from './TicketDetails'

export class TicketDetailsContainer extends Component {
  state = {
    comment: '',
    errMessage: ''
  }

  componentDidMount() {
    this.props.loadEvent(Number(this.props.match.params.id))
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.comment !== '') {
      const dataToSend = {
        comment: this.state.comment,
        ticketId: this.props.match.params.ticketId,
        userId: this.props.user.id
      }
      this.props.createComment(dataToSend)
      this.setState({
        comment: '',
        errMessage: ''
      })
    } else {
      this.setState({ errMessage: 'Please input a comment' })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const ticket = this.props.tickets.find(ticket => { 
        return parseInt(ticket.id) === parseInt(this.props.match.params.ticketId)
    })
    let comments = []
    if (ticket) {
      comments = ticket.comments
    }

    return (
      <TicketDetails
        event={this.props.event}
        user={this.props.user}
        ticket={ticket}
        comments={comments}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        values={this.state}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
  user: JSON.parse(localStorage.getItem('user')),
  tickets: state.tickets,
})

const mapDispatchToProps = {
  loadEvent,
  loadTicket,
  getComments,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailsContainer)
