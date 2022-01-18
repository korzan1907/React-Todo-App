import axios from 'axios'
import {API_URL} from '../../Constants.js'

class TodoDataService {
    retrieveAllTodos(name){
        return axios.get(`${API_URL}/jpa/users/${name}/todos`)
    }
    deleteById(name,id){
        return axios.delete(`${API_URL}/jpa/users/${name}/todos/${id}`)
     }
    updateTodo(name,id,todo){
        return axios.put(`${API_URL}/jpa/users/${name}/todos/${id}`, todo);
    }
    createTodo(name,todo){
        return axios.post(`${API_URL}/jpa/users/${name}/todos/`, todo);
    }
    retrieveTodo(name,id){
         return axios.get(`${API_URL}/jpa/users/${name}/todos/${id}`);
    }
}
export default new TodoDataService()