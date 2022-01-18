import React,{useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js';
function WelcomeComponent(){
    const [welcomeMessage,setN]=useState("");
    function retrieveWelcomeMessage(){
    //    HelloWorldService.executeHelloWorldService()
    //    .then(response => handleSuccessfulResponse(response) )
    //    .catch(error => console.log(error))

    //    HelloWorldService.executeHelloWorldBeanService()
    //    .then(response => handleSuccessfulResponse(response) )
    //    .catch(error => handleError(error.message))

    HelloWorldService.executeHelloWorldPathVariableService(name)
       .then(response => handleSuccessfulResponse(response) )
       .catch(error => handleError(error))
    
}
    function handleSuccessfulResponse(response){
        setN(response.data.message)
    }
    function handleError(error){
        //console.log(error.response.data.message)
        let errorMessage = '';
        if(error.message) {
            errorMessage += error.message
        }
        else if(error.message && error.response.data) {
            errorMessage += error.response.data.message
        }
        setN(errorMessage)
    }
    let {name} = useParams();
        return (
            <>
            <h1>Welcome!</h1>
            <div className="container">
            Welcome {name} to TODO App

            You can manager your todos <Link to="/todos">here</Link>

            </div>
            <div className="container">
                Click here to get a customized message.<p></p>
                <button onClick={retrieveWelcomeMessage} className="btn btn-success">Get Welcome message</button>
            </div>
            <div className="container">
                <p></p>
                {welcomeMessage}
            </div>
            </>
        )
}

export default WelcomeComponent;