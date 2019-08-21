import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import '../../assets/login.css'

function LogInForm (props) {
  return (
    <div>
      {props.user.jwt && <Redirect to={'/'}></Redirect>}
      <form onSubmit={props.handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" className="login-container">
          <Grid item xs={12}>
            <h3>LOGIN</h3>
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
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
              id="password"
              type="password"
              name="password"
              value={props.values.password}
              onChange={props.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Login
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
            <p>Dont have an account yet? <Link to="/signup">Signup here</Link></p>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LogInForm