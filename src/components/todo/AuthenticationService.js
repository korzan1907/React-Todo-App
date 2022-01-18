import axios from "axios";
import {API_URL} from '../../Constants.js'
export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser'

class AuthenticationService {
    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJWTToken(token){
        return 'Bearer ' + token;
    }

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicauth`, {
            headers : {
                authorization: this.createBasicAuthToken(username,password)
            }
        })
    }

    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    
    registerSuccessfulLogin(username, password) {
        //SessionStorage ends when the browser is closed. If Localstorage is used than it has no expiration
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username);
        //console.log("Authentication Successfull")
        // as this is used only in login, this only works if the user is logged in at least one
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginJwt(username, token) {
        //SessionStorage ends when the browser is closed. If Localstorage is used than it has no expiration
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username);
        //console.log("Authentication Successfull")
        // as this is used only in login, this only works if the user is logged in at least one
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE);
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) return false;
        return true;
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) return '';
        return user;
    }

    // This is used for axios interceptors to add basic authentication and this method is called at the login and 
    // stays there 
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()