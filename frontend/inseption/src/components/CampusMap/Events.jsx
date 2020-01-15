import React, {Component} from 'react';
import Event from './Event.jsx'

class Events extends Component {

  /*
  This component acts as a list for the events, which basically renders the events onto the campus map page.
  This is done via the .map function, and takes in the {event}, pushed from the properties of the CampusApp.
  */

  render() {

    const events = this.props.events.map(event =>
            <Event renderEvents={this.props.renderEvents} event={event} eventBuildingClicked={this.props.eventBuildingClicked} data-test="eventObj"/>)

    return (
      

      <div className='campus-events float-left'>
        {events} {/* displays the list of events */}
      </div>

    )
  };
}

export default Events;