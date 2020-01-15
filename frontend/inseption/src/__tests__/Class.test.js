import React from 'react';
import { shallow } from 'enzyme';
import ClassComponent from '../components/Profile/ClassComponent';

const setUp = (props={}) => {
    const component = shallow(<ClassComponent {...props} />)
    return component;
};

describe('Class Component', () => {
    
    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = component.find(`[data-test='addClassForm']`)
        expect(wrapper.length).toBe(1);
    });
});