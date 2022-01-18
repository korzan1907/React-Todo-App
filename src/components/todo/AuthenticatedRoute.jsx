// import React, {Component} from 'react'
// import AuthenticationService from './AuthenticationService.js'
// import {Route} from 'react-router-dom'
// class AuthenticatedRoute extends Component {
//     render(){
//         if(AuthenticationService.isUserLoggedIn()){
//             //Spread operater is getting all the parameters from the calling function
//            return <Route/>
//         }
//     }
// }

// export default AuthenticatedRoute

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationService from "./AuthenticationService";
 
const AuthenticatedRoute = () => {
 
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return AuthenticationService.isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
    
}
 
export default AuthenticatedRoute;