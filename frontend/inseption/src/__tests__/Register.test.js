import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/Auth/Register';

const setUp = (props={}) => {
    const component = shallow(<Register {...props} />)
    return component;
};

describe('Register Component', () => {
    
    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = component.find(`[data-test='registerComponent']`)
        expect(wrapper.length).toBe(1);
    });
});