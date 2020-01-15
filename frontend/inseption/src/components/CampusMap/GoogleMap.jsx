import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

/* 
This file contains the Google Map itself, created with an import from 'google-maps-react'.
This pre creates all the markers (from the data we wrote down from ./data/buildings.js)
and also styles the infowindow (window that pops up whenever the marker is clicked)
*/


const style = {
    width: '59%',
    height: '800px',
    position: 'none',
    border: '10px White',
    borderRadius:'15px'
}

const GoogleMap = (props) => {

    const { google, onclick, currentPlace, currentMarker, isActive, buildings, mapCenter, markerRef } = props;

    const renderMarkers = buildings.map((building, index) => {
                return <Marker  onClick={props.markerInfo.bind(this)}
                                key={building.name} id={index} 
                                title={building.title} name={building.name} dir={building.d}
                                position={building.position}
                                ref={markerRef} />            
            })

    return (
        <div id='campus-map-div'>
            <Map 
                onClick={props.onclick}
                google={google}
                style={style}
                initialCenter={mapCenter}
                zoom={17}>
                
                {renderMarkers}

                <InfoWindow marker={currentMarker} visible={isActive}>
                    <div  className="campus-map-info">
                            <h4>{currentPlace.name}</h4> <br/>
                            {currentPlace.title}

                        <div id="campus-map-directions"><a href={currentPlace.dir} target="_blank">GET DIRECTIONS</a></div>
                    </div>
                </InfoWindow>
            </Map>
        </div>  
    )


}


// The Google maps api key is passed using a wrapper based on the docs from google-maps-react see README
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDQMEifCzG7mwFUoEUIs6crj8QksiHqoC4")
  })(GoogleMap)