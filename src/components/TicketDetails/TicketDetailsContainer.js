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
    this.props.loadTicket(Number(this.props.match.params.ticketId))
    this.props.getComments(Number(this.props.match.params.ticketId))
    this.props.loadEvent(Number(this.props.match.params.id))
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.comment !== '') {
      const dataToSend = {
        comment: this.state.comment,
        ticketId: this.props.ticket.id,
        userId: this.props.user.id
      }
      this.props.createComment(dataToSend)
      this.setState({
        comment: '',
        errMessage: ''
      })
    } else {
      this.setState({ errMessage: 'Please input a comment'})
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return ( 
      <TicketDetails
        event={this.props.event}
        user={this.props.user}
        ticket={this.props.ticket}
        comments={this.props.comments}
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange}
        values={this.state}
        />
    )
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
  user: state.user,
  ticket: state.ticket,
  comments: state.comments
})

const mapDispatchToProps = {
  loadEvent,
  loadTicket,
  getComments,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailsContainer)
