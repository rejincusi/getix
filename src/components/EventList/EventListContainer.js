import React from 'react'
import { getEvents } from '../../actions/events'
import EventList from './EventList'
import { connect } from "react-redux";

class EventListContainer extends React.Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render () {
    return <EventList
            user={this.props.user}
            events={this.props.events}/>
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    user: JSON.parse(localStorage.getItem('user'))
  }
}

const mapDispatchToProps = { getEvents }

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer)