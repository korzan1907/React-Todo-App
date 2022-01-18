import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage, } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
function TodoComponent() {
    let navigate = useNavigate();
    let description = ""
    let targetDate = moment(new Date()).format('YYYY-MM-DD')
    let name = AuthenticationService.getLoggedInUserName();
    let { id } = useParams();
    function onSubmit(values) {
        if (id === -1) {
            let todo = {
                description: values.description,
                targetDate: values.targetDate
            }
            TodoDataService.createTodo(name, todo).then(response => navigate('/todos'))
        }
        else {
            let todo = {
                id: id,
                description: values.description,
                targetDate: values.targetDate
            }
            TodoDataService.updateTodo(name, id, todo).then(response => navigate('/todos'))
        }
    }
    function validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        }
        else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in description'
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors;
    }
    return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
                    enableReinitialize={true}
                    initialValues={{ description, targetDate }}>
                    {({ setFieldValue }) => {
                        useEffect(() => {
                            if (id === -1) {
                                return
                            }
                            else {
                                TodoDataService.retrieveTodo(name, id)
                                    .then(response => {
                                        description = response.data.description
                                        targetDate = moment(response.data.targetDate).format('YYYY-MM-DD')
                                        setFieldValue('description', description)
                                        setFieldValue('targetDate', moment(targetDate).format('YYYY-MM-DD'))
                                    })
                            }

                        }, []);
                        return (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                {/*<fieldSet className="form-group">*/}
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"></Field>
                                {/*</fieldSet>*/}
                                {/*<fieldSet className="form-group">*/}
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                                {/*</fieldSet>*/}
                                <button type="submit" className="btn btn-success">Save</button>
                                {/* <Link to="/todos" type="submit" className="btn btn-success" onClick={onSubmit}>Save</Link>*/}
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>


    )

}

export default TodoComponent