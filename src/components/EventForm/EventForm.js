import * as React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from  '@material-ui/core/Input';
import TextField from  '@material-ui/core/TextField';
import InputLabel from  '@material-ui/core/InputLabel';
import Button from  '@material-ui/core/Button';
import '../../assets/event.css'

function EventForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" className="create-event-container">
          <Grid item xs={12}>
            <h3>CREATE AN EVENT</h3>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                type="text"
                name="title"
                value={props.values.title}
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
              <TextField
                id="dateStart"
                label="Date Time Start"
                type="datetime-local"
                name="dateStart"
                InputLabelProps={{
                  shrink: true,
                }}
                value={props.values.dateStart}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <TextField
                id="dateEnd"
                label="Date Time End"
                type="datetime-local"
                name="dateEnd"
                InputLabelProps={{
                  shrink: true,
                }}
                value={props.values.dateEnd}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Input
                id="location"
                type="text"
                name="location"
                value={props.values.location}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="imageUrl">Image Url</InputLabel>
              <Input
                id="imageUrl"
                type="text"
                name="imageUrl"
                value={props.values.imageUrl}
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
              Login to here to create an event.
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


export default EventForm