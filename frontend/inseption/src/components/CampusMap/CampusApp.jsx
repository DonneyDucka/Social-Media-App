import React, { Component } from 'react';
import buildingList from './data/buildings.js';
import GoogleMap from './GoogleMap.jsx';
import ListofBuildings from './ListofBuildings.jsx';
import Events from './Events.jsx';
import CampusMapService from '../../api/todo/CampusMapService.js'


class CampusApp extends Component {
  /* 
  This component is the main component that houses 3 different types of other components. This is so that
  it becomes more easier to read and format while going through the code, hence the code becomes minimal
  and clean. The three types is the Events, the Google Map itself and the list of buildings
  */

    state = {
        currentPlace: '',
        currentMarker: {},
        isActive: false,
        buildings: buildingList,
        markers: [],
        events: [],
        mapCenter: {lat: -37.808571, lng: 144.964076}
    };

    // show events list
    renderEvents() {
      CampusMapService.retrieveAllEvents()
        .then(
          response => {
            this.setState({ events: response.data})
          }
        )
    }

    componentDidMount() {
      this.renderEvents();
  }


    // marker stuff
    getMarkerRef = (ref) => {
        if (ref !== null) {
          this.setState(prevState => ({
            markers: [...prevState.markers, ref]
          }));
        }
      }
      
    onMapClicked = (props) => {


      if (this.state.showingInfoWindow) {
        this.setState({
          isActive: false,
          currentMarker: null
        })
      }
     
    };

    onMarkerClicked = (props, marker) => {

        const animatingMarkers = this.state.markers;

        // For each marker in the state, if the name matches the name of the marker passed into the function
        // As an argument, then set it's animation to bounce, otherwise set the marker animation to null
        animatingMarkers.forEach(m => {
          if (m.marker.name === marker.name) {
            m.marker.setAnimation(4);
          } else {
            m.marker.setAnimation(null);
          }
        })

        this.setState({
            currentPlace: props,
            currentMarker: marker,
            isActive: true,
            markers: animatingMarkers,
        })
    }   

    buildingClicked = (event) => {
        const target = event.target;
        const value = target.value;
        const tempMarker = this.state.markers.filter(marker => marker.props.name === value);
        this.onMarkerClicked(tempMarker[0].props, tempMarker[0].marker);
    }

    eventBuildingClicked = (buildingName) => {
      const tempMarker = this.state.markers.filter(marker => marker.props.name === buildingName);
      this.onMarkerClicked(tempMarker[0].props, tempMarker[0].marker);
    }


    render() {
        const { currentPlace, currentMarker, isActive, buildings, mapCenter } = this.state;

        return (
            <div className="campus-background" data-test="campusMap">
            <div className='campus-map-app overflow-hidden' data-test="campusEvent">
              
                <GoogleMap className='campus-map-div float-left'
                    onclick={this.onMapClicked}
                    currentPlace={currentPlace}
                    currentMarker={currentMarker}
                    isActive={isActive}
                    buildings={buildings}
                    mapCenter={mapCenter}
                    markerRef={this.getMarkerRef}
                    markerInfo={this.onMarkerClicked}
                    data-test="campusMarker"
                    />
                
                <h1 >Upcoming Events</h1>
                <a href="/campus+add+event">Add an event </a>   
                <Events renderEvents={this.renderEvents.bind(this )} events={this.state.events} eventBuildingClicked={this.eventBuildingClicked}/>

            </div>
            <ListofBuildings
                    buildings={buildings}
                    buildingClicked={this.buildingClicked}/>
            </div>
        )
    }



}


export default CampusApp;