import React from 'react'
import { Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import '../../assets/event.css'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

function EventList (props) {
  const {
    // user,
    events,
  } = props

  return <div>
    <Container maxWidth="md">
      <Grid container alignItems="center" justify="center" direction="column" spacing={10} className="search-container">
        <Grid item xs={12} lg={6}>
          <Typography variant="h4">
            Grab your tickets!
          </Typography>
          <TextField
            id="searchEvent"
            className="search-field"
            label="Search Event"
            type="search"
            margin="normal"
            variant="filled"
          />
          <Button className="search-btn" variant="contained" size="large" color="primary">
            <Icon>search</Icon>
          </Button>
        </Grid>
        
        { props.user.jwt ? (
          <Grid className="add-btn-con" item xs={12} lg={6}>
            <Link to="/new-event">
              <Button className="add-btn" variant="contained" size="large" color="primary">
                Add new event
              </Button>
            </Link>
          </Grid>
        ) : (
          <Grid className="add-btn-con" item xs={12} lg={6}>
            <Link to="/login">
              <Button className="add-btn" variant="contained" size="large" color="primary">
               Login to create event
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={10} className="event-list">
      {events && events.map(event =>
        <Grid key={event.id} item xs={12} md={4} sm={6} lg={4}>
          <Link to={`./event/${event.id}`}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={event.title}
                  height="140"
                  image={event.imageUrl}
                  title={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    {event.title}
                  </Typography>
                  <Typography gutterBottom paragraph={true}>
                    {new Date(event.dateStart).toDateString()} {new Date(event.dateStart).toLocaleTimeString()}
                  </Typography>
                  <div className="event-card">
                    <Typography variant="body2" color="textSecondary" component="p">
                    {event.description}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      )}
      </Grid>
    </Container>
  </div>
}

export default EventList