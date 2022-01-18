import React, {Component} from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import LoginComponentWithNavigate from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
class TodoApp extends Component {
    render() {
        return (
        <div className="TodoApp">
            
            <Router>
            <HeaderComponent></HeaderComponent>
              <Routes>
                  <>
                    <Route path="/" element={<LoginComponentWithNavigate/>}/>
                    <Route path="/login" element={<LoginComponentWithNavigate/>}/>
                    <Route exact path='/' element={<AuthenticatedRoute/>}>
                        <Route path="/welcome/:name" element={<WelcomeComponent/>}/>
                        <Route path="/todos/:id" element={<TodoComponent/>}/>
                        <Route path="/todos" element={<ListTodosComponent/>}/>
                        <Route path="/logout" element={<LogoutComponent/>}/>
                    </Route>
                 
                 <Route path="*" element={<ErrorComponent/>}/>
                 </>
             </Routes>
             <FooterComponent></FooterComponent>
             </Router>
        </div>
        )

    }

}

export default TodoApp