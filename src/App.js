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
import EventFormContainer from './components/EventForm/EventFormContainer';
import EventDetailsContainer from './components/EventDetails/EventDetailsContainer';
import TicketFormContainer from './components/TicketForm/TicketFormContainer';
import TicketDetailsContainer from './components/TicketDetails/TicketDetailsContainer';
import TicketEditFormContainer from './components/TicketEditForm/TicketEditFormContainer';

export const history = createBrowserHistory({forceRefresh:true})

class App extends Component {
  render() {
    return (
      <Router>
        {/* navbar here */} 
        <AppBar position="fixed" className="nav-menu">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography variant="h6">
                  <Link to="/">GeTix</Link>
                </Typography>
              </Grid>
              { this.props.user.jwt ? (
                <Grid item>
                  <Link to="/">
                    <Button color="inherit">Logout</Button>
                  </Link>
                </Grid>
              ) : (
                <Grid item>
                  <Link to="/login">
                    <Button color="inherit">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button color="inherit">Signup</Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={EventListContainer} />
        <Route path ='/event/:id' component={EventDetailsContainer} />
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
    user:state.user
  }
}

export default connect(mapStateToProps)(App)