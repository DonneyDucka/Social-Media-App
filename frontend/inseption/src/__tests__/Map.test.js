import React from 'react';
import { shallow } from 'enzyme';
import CampusApp from '../components/CampusMap/CampusApp';
import Events from '../components/CampusMap/Events'
import ListofBuildings from '../components/CampusMap/ListofBuildings';

const setUpMap = (props={}) => {
    const map = shallow(<CampusApp {...props} />)
    return map;
};

const setUpEvents = (props={
    events:[{
        title: 'test',
        description: 'aaa',
        eventDate: 'bbb',
        eventEnd: 'ccc',
        buildingName:'ddd',
    }, {
        title: 'test1',
        description: 'eee',
        eventDate: 'fff',
        eventEnd: 'ggg',
        buildingName:'hhh',
    }]
}) => {
    const events = shallow(<Events {...props} />)
    return events;
};


describe('Campus Map Component', () => {
    
    let map;
    let events;
    beforeEach(() => {
        map = setUpMap();
        events = setUpEvents();    
    });

    it('Should render without errors', () => {
        const wrapper = map.find(`[data-test='campusMap']`)
        expect(wrapper.length).toBe(1);
    });

    it('Campus marker should render without errors', () => {
        const wrapper = map.find(`[data-test='campusMarker']`)
        expect(wrapper.length).toBe(1);
    });

    it('Campus event should render without errors', () => {
        const wrapper = map.find(`[data-test='campusEvent']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render 2 events without errors', () => {
        const wrapper = events.find(`[data-test='eventObj']`)
        expect(wrapper.length).toBe(2);
    });
});
