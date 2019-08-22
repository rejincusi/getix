import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvent } from '../../actions/events'
import EventDetails from './EventsDetails'

export class EventDetailsContainer extends Component {

  componentDidMount() {
    this.props.loadEvent(Number(this.props.match.params.id))
  }

  render() {
    const eventId =  this.props.match.params.id 
    const tickets = this.props.tickets.filter(ticket => ticket.eventId === Number(eventId))
    console.log("tickettt:", tickets)
    
    return (
      <EventDetails
        event={this.props.event}
        user={this.props.user}
        tickets={tickets}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
  user: state.user,
  tickets: state.tickets
})

const mapDispatchToProps = {
  loadEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer)
