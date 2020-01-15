import React, { Component } from 'react'
import AuthenticationService from '../../api/todo/AuthenticationService.js'
import { Link } from 'react-router-dom'

/*
This is the login page, one of the main pages which authenticates the user username and password with the help
of the authentication service (see the login clicked function below).
*/

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        //sept,dummy
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response.data.token)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                window.location.href = `/welcome/${this.state.username}`;
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (

            <div className="login-app">


                <div className="login-container" data-test="loginComponent" margin="0 auto">
                    
                   
                    
                    <div id="login-header"><strong>Login</strong></div>
                    {this.state.hasLoginFailed && <div className="alert alert-warning" data-test="loginErrorAlert">Username and password do not match</div>}
                    {this.state.showSuccessMessage && <div data-test="loginSuccessAlert">Login Sucessful</div>}
                
                <div id="login-padding">
                    <input id="reg-Input" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} /> <br></br>
                    <input id="reg-Input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />

                </div>
                
                    <button id="login-button" onClick={this.loginClicked}>Sign in</button>
                    
                    <div>
                        <span id="login-bottom-comp">
                            <a href="/register">Not a member? Register </a>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent