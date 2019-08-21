import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvent } from '../../actions/events'
import { getTickets } from '../../actions/tickets'
import EventDetails from './EventsDetails'

export class EventDetailsContainer extends Component {

  componentDidMount() {
    this.props.getTickets(Number(this.props.match.params.id))
    this.props.loadEvent(Number(this.props.match.params.id))
  }

  render() {
    return ( 
      <EventDetails
        event={this.props.event}
        user={this.props.user}
        tickets={this.props.tickets}
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
  getTickets
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer)
