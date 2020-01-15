import React, { Component } from 'react'
import FileBase64 from 'react-file-base64'
import AuthenticationService from '../../api/todo/AuthenticationService.js'

/*
This file is another functionality that registers the user with its details.
It also attempts to check the legitimacy of the email by checking if it has an @ (for example).
and also checks if the password & confirmed password is the same.
*/


class Register extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            imageUploadedBase64: 'data:image/png;base64,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',
            password: '',
            email: '',
            ConfirmPassword: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    getFiles(files) {
        this.setState({ imageUploadedBase64: files['base64'] })
        console.log(this.state.imageUploadedBase64)
    }

    registerClicked() {
        var regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var inputError = false
        if (!regexMail.test(this.state.email)) 
        {
            alert("Email entered incorrectly!")
            inputError = true
        }
        if (this.state.password != this.state.ConfirmPassword)
        {
            alert("Passwords entered don't match!")
            inputError = true
        }
        if (!inputError)
        {
            AuthenticationService.registerService(this.state.username, this.state.password, this.state.email, this.state.ConfirmPassword
                , this.state.imageUploadedBase64, this.state.firstName, this.state.lastName).then((response) => {
                AuthenticationService
                .executeJwtAuthenticationService(this.state.username, this.state.password)
                .then((response) => {
                    console.log(response.data.token)
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                    this.props.history.push(`/welcome/${this.state.username}`)
                }).catch(() => {
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                })
            }).catch(error => {
                console.log(error.response)
            });
        }
    }
    
    render() {
        return (
            <>
            <div className="register-app" data-test="registerComponent">

                <div className="reg-container">
                        <div id="reg-header"><strong>Register</strong></div>
                <div id="reg-header-text">Register your details below and get started!</div>
                  

                    <input id="reg-Input" placeholder = "First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    <br />

                    
                    <input id="reg-Input" placeholder = "Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    <br />

                        <input id="reg-Input" placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    
                    <input id="reg-Input" placeholder = "Email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <br />

                    <input id="reg-Input" placeholder = "Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <br />

                    <input id="reg-Input" placeholder = "Confirm Password" type="password" name="ConfirmPassword" value={this.state.ConfirmPassword} onChange={this.handleChange}/>
                    <br />
                
                    <button id="reg-Submit" type="submit" onClick={this.registerClicked}>Sign Up</button>
                    <div>
                        <span id="login-bottom-comp">
                                <a href="/login">Already have an account? </a>
                        </span>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Register