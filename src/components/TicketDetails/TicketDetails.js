import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import '../../assets/ticket.css'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"


function TicketDetails(props) {
  if (!props.event || !props.ticket) return 'Loading ticket data...'
  let riskClassName = 'risk-green'
  if (props.ticket) {
    if (props.ticket.risk > 35 && props.ticket.risk < 65) {
    riskClassName = 'risk-yellow'
    } else if (props.ticket.risk > 65 ) {
    riskClassName = 'risk-red'
    }
  }
  

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
                  {props.event.title} {`${props.ticket.quantity}x € ${props.ticket.price}`}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  {new Date(props.event.dateStart).toDateString()} {new Date(props.event.dateStart).toLocaleTimeString()}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  {props.event.location}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  Seller name: {props.ticket.user.name}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  Ticket information: {props.ticket.description}
                </Typography>
                <Typography gutterBottom paragraph={true}>
                  We calculated that the risk of this ticket being fraud is &nbsp;
                  <span className={riskClassName}>
                   {props.ticket ? props.ticket.risk.toFixed(2) : 5}%
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        
        {/* comments for this ticket/seller */}

        <Grid item xs={12} md={8} sm={6} lg={8}>
          <Typography variant="h5" color="textSecondary" component="h5">
            <br/>
            Comments
          </Typography>
          <br/>
        </Grid>

        {props.comments && props.comments.map(comment =>
          <Grid key={comment.id} item xs={12} md={8} sm={6} lg={8} className="comment-item">
            <Card>
              <CardHeader
                avatar={
                  comment.user && comment.user.imageUrl !== null ? (
                    <Avatar alt={comment.user.name} src={comment.user.imageUrl} />
                  ) : (
                    <Avatar aria-label="name">
                      {comment.user && comment.user.name ? comment.user.name.charAt(0) : "GT"}
                    </Avatar>
                  )
                }
                title={comment.user.name}
                subheader={comment.comment}
              />
            </Card>
          </Grid>
        )}

        {/* comment form */}
        <Grid item xs={12} md={8} sm={6} lg={8} className="ticket-comment-form">
        { props.user.jwt ? ( 
          <form onSubmit={props.handleSubmit}>
            <TextField
              id="comment"
              name="comment"
              value={props.values.comment}
              onChange={props.handleChange}
              label="Add a comment"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
            />
            <br/>
            
            <Button fullWidth={true} type="submit" variant="contained" size="large" color="primary">Post a comment</Button>
          </form>
          ) : (
            <Link to="/login">
              <Button fullWidth={true} className="add-btn" variant="contained" size="large" color="primary">
              Login to post a comment
              </Button>
            </Link>
          )}
        </Grid>
        <Grid item xs={12} md={8} sm={6} lg={8}>
          {props.values.errMessage ? (
            <p className="error-message">{props.values.errMessage}</p>
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default TicketDetails  