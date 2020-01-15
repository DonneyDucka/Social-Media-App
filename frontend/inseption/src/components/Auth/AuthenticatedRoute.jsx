import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../api/todo/AuthenticationService.js'

class AuthenticatedRoute extends Component {
    //This class authenticates and verifies the user, otherwise redirects the web to the login page.
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute