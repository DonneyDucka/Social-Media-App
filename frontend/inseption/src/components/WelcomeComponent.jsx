import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx';
import AuthenticationService from '../api/todo/AuthenticationService'

/*
After the user has successfully logged in, the user is greeted to the main
dashboard of the website, that the user can interact with and go to logout /go to profile / view campus map.
*/


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    componentDidMount(){
    }

    render() {
        const profileLink = '/profile?name=' + AuthenticationService.getLoggedInUserName()
        const viewmapLink = '/campus/'
        return (
            <>
<HeaderComponent/>
                <div className="home-container">
                <div className = "background">
                    
                <div className="home-container-writing">
                    <img src={this.state.imageUploadedBase64}></img>
                    <h1>Welcome {this.props.match.params.name}!</h1>
                    What would you like to do today?
                </div>
   
   
                    <div className="home-list-container">
                
                            <a href={profileLink}>
                                <div className="home-column">
                                    <img src="https://static.thenounproject.com/png/152407-200.png" width="50px" height="50px"></img>
                                    <br></br>View Profile
                      </div>
                            </a>
                            
                            <a href={viewmapLink}>
                            <div className="home-column">
                                <img src="https://static.thenounproject.com/png/1569832-200.png" width="50px" height="50px"></img>
                                <br></br>View Map
                            <br></br>Click to view upcoming events.  
                        </div>
                        </a>

                      
                      </div>

                     
                     

                    

                   </div>
                </div>

            

            </>
        )
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {

        console.log(error.response)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({ welcomeMessage: errorMessage })
    }

}


export default WelcomeComponent