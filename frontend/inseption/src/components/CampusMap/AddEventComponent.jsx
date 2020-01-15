import React, { Component } from 'react'
import CampusMapService from '../../api/todo/CampusMapService.js'
import AuthenticationService from '../../api/todo/AuthenticationService.js'

class AddEventComponent extends Component {
  
    /* 
    This component is the for the events page, where we incorporate the use of the back end with the use
    of the form. Once the user has entered in the details (title, desc, event date, building choice), upon
    submission, the click will cause the backend to add the add the event, and redirect to the campus page.
    */
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            title: '',
            description: '',
            eventDate: '',
            eventEnd: '',
            building: '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    addEventClicked() {
        CampusMapService.addEvent(AuthenticationService.getLoggedInUserName(), 
                    this.state.title, this.state.description, 
                    this.state.eventDate, this.state.eventEnd, this.state.building)
                    .then(res => {
                        const redirectionlink =  "/profile?name=" + this.state.username;     
                        this.props.history.push(`/campus/`);
                    });
    }

    
    render() {
        return (
            <>
            <div className="register-app">

                <div className="reg-container">
                    <div id="reg-header">Add an Event!</div>
                            <div id="reg-Text">Title:</div>
                            <input id="reg-Input" type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)}/>
                            <br />

                            <div id="reg-Text">Descriptions:</div>
                            <input id="reg-Input" type="text" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}/>
                            <br />

                            <div id="reg-Text">Start Date:</div>
                            <input id="reg-Input" type="datetime-local" name="eventDate" value={this.state.eventDate} min="2019-10-17T00:00" max="2020-10-17T00:00" onChange={this.handleChange.bind(this)}/>
                            <br />

                            <div id="reg-Text">End Date:</div>
                            <input id="reg-Input" type="datetime-local" name="eventEnd" value={this.state.eventEnd} min="2019-10-17T00:00" max="2020-10-17T00:00" onChange={this.handleChange.bind(this)}/>
                            <br />

                            <div id="reg-Text">Where?:</div>
                            <select name="building"  onChange={this.handleChange.bind(this)}>
                                            <option value=""></option>
                                            <option value="RMIT Alumni Courtyard">RMIT Alumni Courtyard</option>
                                            <option value="Building 5">Building 5</option>
                                            <option value="Building 7">Building 7</option>
                                            <option value="Building 8">Building 8</option>
                                            <option value="RMIT Gallery">RMIT Gallery</option>
                                            <option value="Building 9">Building 9</option>
                                            <option value="Building 10">Building 10</option>
                                            <option value="Building 12">Building 12</option>
                                            <option value="Building 14">Building 14</option>
                                            <option value="Building 16">Building 16</option>
                                            <option value="Building 22">Building 22</option>
                                            <option value="Building 51">Building 51</option>
                                            <option value="Building 56">Building 56</option>
                                            <option value="Building 57">Building 57</option>
                                            <option value="Building 80">Building 80</option>
                                            <option value="Building 94">Building 94</option>
                                            <option value="Building 100">Building 100</option>
                            </select> <br/>

                            <button id="reg-Submit" type="submit" onClick={this.addEventClicked.bind(this)}>Add Event</button>
                        <div>
                    </div>
                    <div><a href="/campus">Back to Campus</a></div>
                </div>
            </div>
            </>
        )
    }
}

export default AddEventComponent;