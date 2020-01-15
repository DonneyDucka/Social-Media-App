import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from '../components/HeaderComponent';

const setUp = (props={}) => {
    const component = shallow(<HeaderComponent {...props} />)
    return component;
};

describe('Header Component', () => {
    
    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = component.find(`[data-test='headerComponent']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render logout div', () => {
        const wrapper = component.find(`[data-test='logout-link']`)
        expect(wrapper.length).toBe(1);
    });
});