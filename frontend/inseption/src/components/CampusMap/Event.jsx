import React, {Component} from 'react'
import moment from 'moment'
import AuthenticationService from '../../api/todo/AuthenticationService.js'
import CampusMapService from '../../api/todo/CampusMapService.js'

class Event extends Component {

    delEvent(id) {
        console.log(id)
        console.log(this.props.event.username)
    CampusMapService.deleteEvent(this.props.event.username, id).then(res => {
        this.props.renderEvents()
    })
    }
    /*
    This component is the singular event, which renders in a small box that the user can see,
    and a delete button that appears only to the creation of the user.
    */


    render() {
        
        return (
        
        <div id='campus-map-column' className ="campus-map-column" >
       <strong> Title: </strong>
        {this.props.event.title} <br/>
       <strong> Descriptions: </strong>
        {this.props.event.descriptions}<br/>
        <strong>Start Time: </strong> 
        {moment(this.props.event.eventDate).format('YYYY-MM-DD HH:mm')}<br/>
        <strong> End Time: </strong>
        {moment(this.props.event.eventEnd).format('YYYY-MM-DD HH:mm')}<br/>
         <strong> Posted By: </strong>
        {this.props.event.username}<br/>
            
            <div className="mapBtn btn btn-primary" 
            key={this.props.event.buildingName}
            id='campus-map-event'
            onClick={this.props.eventBuildingClicked.bind(this, this.props.event.buildingName)}
            role='buildingitem'
            onKeyPress={this.props.eventBuildingClicked.bind(this, this.props.event.buildingName)}
            >
                {'Find Building'}
            </div>
            

             {((this.props.event.username == AuthenticationService.getLoggedInUserName())) ? 

                     <div className="mapBtn btn btn-danger" 
            key={this.props.event.id}
            id='campus-map-event'
            onClick={()=>this.delEvent(this.props.event.id)}
            >
                {'Delete Event'}
            </div>
             
             : null} 


        </div>
        )
    }
}

export default Event;