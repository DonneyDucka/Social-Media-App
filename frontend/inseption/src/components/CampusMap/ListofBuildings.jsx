import React from 'react';

/*
This file renders the whole list of buildings from the data composed in ./data/buildings.js
*/

const ListofBuildings = (props) => {

    const { buildings } = props;

    const buildingList = buildings.map(building => {
        return (
            <option
              value={building.name}
              className='campus-building'
              role='buildingitem'
              onKeyPress={props.buildingClicked.bind(this)}
              data-test="buildingObj"
            >
                {building.name}
            </option>
        )
    });

    return (
        <div className='campus-map-list'>

            <select  onChange={props.buildingClicked.bind(this)}>
                {buildingList}
            </select>
        </div>
    );



}

export default ListofBuildings;