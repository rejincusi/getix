import * as React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from  '@material-ui/core/Input';
import InputLabel from  '@material-ui/core/InputLabel';
import Button from  '@material-ui/core/Button';
import '../../assets/signup.css'

function SignupForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" className="signup-container">
          <Grid item xs={12}>
            <h3>SIGNUP</h3>
            <FormControl>
              <InputLabel htmlFor="userName">Name</InputLabel>
              <Input
                id="userName"
                type="text"
                name="name"
                value={props.values.name}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                name="email"
                value={props.values.email}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="signUpPassword">Password</InputLabel>
              <Input
                id="signUpPassword"
                type="password"
                name="password"
                value={props.values.password}
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
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </Grid>
          <Grid item xs={12}>
            {props.values.errMessage ? (
               <p className="error-message">{props.values.errMessage}</p>
              ) : (
              <div />
            )}
          </Grid>
          <Grid item xs={12}>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </Grid>
        </Grid>
      </form>
      </div>
    );
}


export default SignupForm