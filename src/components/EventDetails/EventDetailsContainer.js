import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvent } from '../../actions/events'
import EventDetails from './EventsDetails'

export class EventDetailsContainer extends Component {

  componentDidMount() {
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
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer)
