import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import LoginFormContainer from './components/LoginForm/LoginFormContainer'
import SignupFormContainer from './components/SignupForm/SignupFormContainer'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import EventListContainer from './components/EventList/EventListContainer'
import '../src/App.css';
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import { serverUrl } from './serverUrl'
import { allTickets } from './actions/tickets'
import EventFormContainer from './components/EventForm/EventFormContainer';
import EventDetailsContainer from './components/EventDetails/EventDetailsContainer';
import TicketFormContainer from './components/TicketForm/TicketFormContainer';
import TicketDetailsContainer from './components/TicketDetails/TicketDetailsContainer';
import TicketEditFormContainer from './components/TicketEditForm/TicketEditFormContainer';

export const history = createBrowserHistory({ forceRefresh: true })

class App extends Component {
  source = new EventSource(`${serverUrl}/stream`)

  componentDidMount() {
    console.log(localStorage.getItem('user'))
    this.source.onmessage = event => {
      const tickets = JSON.parse(event.data);
      this.props.allTickets(tickets);
    }
  }

  handleLogOut = () => {
    localStorage.removeItem('user')
    history.push('/')
  }

  render() {
    return (
      <Router>
        <AppBar position="fixed" className="nav-menu">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography variant="h6">
                  <Link to="/">GeTix</Link>
                </Typography>
              </Grid>
              {this.props.user ? (
                <Grid item>
                  <Button onClick={this.handleLogOut} color="inherit" className="account-user-btn">Logout</Button>
                </Grid>
              ) : (
                  <Grid item>
                    <Link to="/login">
                      <Button variant="outlined" className="account-user-btn">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button color="inherit" className="account-user-btn">Signup</Button>
                    </Link>
                  </Grid>
                )}
            </Grid>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={EventListContainer} />
        <Route path='/event/:id' component={EventDetailsContainer} />
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/signup" component={SignupFormContainer} />
        <Route path="/event-ticket/:id/new-ticket" component={TicketFormContainer} />
        <Route path="/event-detail/:id/ticket/:ticketId" component={TicketDetailsContainer} />
        <Route path="/event-edit-ticket/:id/ticket/:ticketId" component={TicketEditFormContainer} />
        <Route path="/new-event" component={EventFormContainer} />
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: JSON.parse(localStorage.getItem('user'))
  }
}

const mapDispatchToProps = {
  allTickets
}

export default connect(mapStateToProps, mapDispatchToProps)(App)