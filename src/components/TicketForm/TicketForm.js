import * as React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from  '@material-ui/core/Input';
import InputLabel from  '@material-ui/core/InputLabel';
import Button from  '@material-ui/core/Button';
import '../../assets/event.css'

function TicketForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" className="create-event-container">
          <Grid item xs={12}>
            <h3>SELL TICKETS</h3>
            <FormControl>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                type="number"
                name="price"
                value={props.values.price}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={props.values.description}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                value={props.values.quantity}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          { props.user.jwt ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Link to="/login">
              Login to here to sell a ticket.
            </Link>
          )}
          </Grid>
          <Grid item xs={12}>
            {props.values.errMessage ? (
               <p className="error-message">{props.values.errMessage}</p>
              ) : (
              <div />
            )}
          </Grid>
          
        </Grid>
      </form>
      </div>
    );
}


export default TicketForm