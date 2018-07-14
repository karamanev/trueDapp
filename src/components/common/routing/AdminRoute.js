import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from '../../auth/Auth'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
      Auth.isUserAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
    )
  } />
)

export default PrivateRoute