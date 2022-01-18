import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import { Link } from 'react-router-dom'
import moment from 'moment'
class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this)
    }
    componentDidMount() {

        //Always make the call in this function which is called after the state is set
        //order is Constructo-> Render if state is set in constructor->ComponentDidMount->Render again with the new state from componentdidmount-> when changing page to another site componentWillUnmount is called
        //shouldComponentUpdate is also another interesting function which is used for performance cases
        //When there is a state change render() is called
        // console.log('componentDidMount')
        this.refreshTodos();
        // console.log(this.state)
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate')
        // console.log(nextProps)
        // console.log(nextState)
        return true
    }
    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteById(username, id)
            .then(response => {
                this.setState({ message: `Delete of todo ${id} is successful` })
                this.refreshTodos()
            })
            .catch(error => console.log(error))

    }
    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(response => this.setState({ todos: response.data }))
    }
    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.isDone.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><Link type="submit" className="btn btn-success" to={`/todos/${todo.id}`}>Update</Link></td>
                                            <td><button type="submit" className="btn btn-warning" onClick={() => { this.deleteTodoClicked(todo.id) }}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                    <div className="row w-25">
                    <Link type="submit" className="btn btn-success w-25" to={`/todos/-1`} >Add</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent