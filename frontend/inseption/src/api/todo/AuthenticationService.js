import axios from 'axios'
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'userToken'

/*
This file is a javascript acting as a portal between the front end and the back end. The client side of the system
will push its properties into the backend side, and interact with the database, returning with data that can be used
to verify activity.
*/

class AuthenticationService {
    registerService(username, password, email, confirmPassword, profilePicture, firstName, lastName, major) {
        return axios.post(`${API_URL}/register`, {
            username,
            password,
            email,
            confirmPassword,
            profilePicture,
            firstName,
            lastName,
            major
        })
    }
    
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
        window.location.href = `/login`;
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null){
            return false
        } 
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                    console.log(token);
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()