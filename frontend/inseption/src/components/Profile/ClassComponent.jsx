import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClassDataService from '../../api/todo/ClassDataService.js'
import AuthenticationService from '../../api/todo/AuthenticationService.js'

/*
This file contains the adding of classes (one of the functionalities in the profile page), where
the user is able to input in class, description, starting time, ending time, the day of the weem
and which building the class belongs to.
This then gets added to the database with the click of a button
*/


class ClassComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            description: '',
            start: '',
            end: '',
            day: '',
            location: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    componentDidMount() {
        
        console.log("Running componentDidMount")
        const { id } = this.props.match.params
        this.setState({
            id: id
        }, () => {
            if (this.state.id === -1) {
                return
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
      }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        }
        if (!this.state.start) {
            errors.start = 'Select a Start Time'
            alert('Select a Start Time')
        }
        if (!this.state.end) {
            errors.end = 'Select a End Time'
            alert('Select a End Time')
        }
        if (!this.state.day) {
            errors.day = 'Select a Day'
            alert('Select a Day')
        }
        if (!values.location) {
            errors.location = 'Enter a Location'
        }
        if (this.state.end == this.state.start) {
            errors.dupe = 'Start Time and End Time cannot be the same'
            alert('Start Time and End Time cannot be the same')
        }
        if (this.state.end < this.state.start) {
            errors.later = 'End time cannot be earlier than start time'
            alert('End time cannot be earlier than start time')
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let c = {
            id: this.state.id,
            description: values.description,
            startTime: this.state.start,
            endTime: this.state.end,
            day: this.state.day,
            location: values.location
        }
        console.log(c)
        const profileLink = "/profile?name=" + username;

        ClassDataService.createClass(username, c)
                .then(() => this.props.history.push(profileLink))

    }

    componentDidMount(){
        this.setState({
            id:this.props.match.params.id,
        })
    }

    render() {

        return (
            <div className="todos-apps">
                <h1>Add a Class</h1>
                <div className="container" data-test="addClassForm">
                    <Formik
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="start" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="end" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="day" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="location" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="dupe" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="later" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Class</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Start Time</label>
                                        < select name="start"  onChange={this.handleChange}>
                                            <option value=""></option>
                                            <option value="08:30">08:30</option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:30">11:30</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:30">17:30</option>
                                            <option value="18:30">18:30</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:30">20:30</option>
                                        </select>
                                        <label>End Time</label>
                                        <select name="end"  onChange={this.handleChange}>
                                            <option value=""></option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:30">11:30</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:30">17:30</option>
                                            <option value="18:30">18:30</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:30">20:30</option>
                                            <option value="21:30">21:30</option>
                                        </select>
                                        <label>Day</label>
                                        < select name="day" onChange={this.handleChange}>
                                            <option value=""></option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                        </select>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Location</label>
                                        <Field className="form-control" type="text" name="location" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ClassComponent