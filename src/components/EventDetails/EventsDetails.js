import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import '../../assets/ticket.css'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';

function EventsDetails(props) {
  if (!props.event || !props.tickets) return 'Loading event data...'

  return (
    <Container maxWidth="md">
      <Grid container alignItems="center" justify="center" direction="column" className="event-detail-con">
        <Grid item xs={12} md={8} sm={6} lg={8}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={props.event.title}
                height="140"
                image={props.event.imageUrl}
                title={props.event.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  {props.event.title}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  {new Date(props.event.dateStart).toDateString()} {new Date(props.event.dateStart).toLocaleTimeString()}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  {props.event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.event.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sm={6} lg={8}>
          { props.user ? (
            <Grid className="add-btn-con" item xs={12} lg={12}>
              <Link to={`/event-ticket/${props.event.id}/new-ticket`}>
                <Button fullWidth={true} className="add-btn" variant="contained" size="large" color="primary">
                  Sell ticket for this event
                </Button>
              </Link>
            </Grid>
          ) : (
            <Grid className="add-btn-con" item xs={12} lg={12}>
              <Link to="/login">
                <Button fullWidth={true} className="add-btn" variant="contained" size="large" color="primary">
                Login to sell ticket
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
        
        <Grid item xs={12} md={8} sm={6} lg={8}>
          <Typography variant="h5" color="textSecondary" component="h5">
            Available tickets for this event
          </Typography>
          <br/>
        </Grid>

        {props.tickets && props.tickets.map(ticket =>
          <Grid key={ticket.id} item xs={12} md={8} sm={6} lg={8} className="ticket-item">
            <Link to={`/event-detail/${props.event.id}/ticket/${ticket.id}`}>
              <Card>
                <CardHeader
                  avatar={
                    ticket.user && ticket.user.imageUrl !== null ? (
                      <Avatar alt={ticket.user.name} src={ticket.user.imageUrl} />
                    ) : (
                      <Avatar aria-label="name">
                        {ticket.user && ticket.user.name ? ticket.user.name.charAt(0) : "GT"}
                      </Avatar>
                    )
                  }
                  action={
                    props.user.id === ticket.user.id ? (
                      <Link to={`/event-edit-ticket/${props.event.id}/ticket/${ticket.id}`}>
                        <IconButton aria-label="settings">
                          <Icon>edit</Icon>
                        </IconButton>
                      </Link>
                    ) : (
                      <div/>
                    )
                  }
                  title={`${ticket.description}`}
                  subheader={`${ticket.quantity}x € ${ticket.price}`}
                />
              </Card>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default EventsDetails