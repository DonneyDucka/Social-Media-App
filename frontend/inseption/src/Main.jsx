import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute.jsx'
import AuthenticationService from './api/todo/AuthenticationService.js'
import LoginComponent from './components/Auth/LoginComponent.jsx'
import Register from './components/Auth/Register.jsx'
import ErrorComponent from './components/ErrorComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import FooterComponent from './components/FooterComponent.jsx'
import LogoutComponent from './components/Auth/LogoutComponent.jsx'
import WelcomeComponent from './components/WelcomeComponent.jsx'
import ClassComponent from './components/Profile/ClassComponent.jsx'
import ProfileComponent from './components/Profile/ProfileComponent.jsx'
import CampusApp from './components/CampusMap/CampusApp.jsx'
import AddEventComponent from './components/CampusMap/AddEventComponent.jsx'
import { relativeTimeRounding } from 'moment';
import SignInSide from './components/Auth/LoginComponent.jsx';


/*
This file is the main component that brings in all the other components together
*/

class Main extends Component {

    componentWillMount(){
        if (AuthenticationService.isUserLoggedIn()){
            AuthenticationService.setupAxiosInterceptors(AuthenticationService.createJWTToken(sessionStorage.getItem("userToken")));
        }
    }

    render() {


        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            

            <div className="TodoApp">
                <Router>
                    <>
                        {isUserLoggedIn && window.location.href.indexOf("/welcome") < 0  && <HeaderComponent />}
                    
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={SignInSide}/>
                            <Route path="/register" component={Register}/>
                            <AuthenticatedRoute path="/campus" component={CampusApp}/>
                            <AuthenticatedRoute path="/campus+add+event" component={AddEventComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/classes/:id" component={ClassComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute path="/profile" component={ProfileComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        {/* <FooterComponent/> */}
                        {/* {isUserLoggedIn && <FooterComponent />} */}
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default Main