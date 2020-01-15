import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from '../components/Auth/LoginComponent';

const setUp = (props={}) => {
    const component = shallow(<LoginComponent {...props} />)
    return component;
};

describe('Login Component', () => {
    
    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = component.find(`[data-test='loginComponent']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should not render login success alert', () => {
        component.setState({
            showSuccessMessage: true
        });

        const wrapper = component.find(`[data-test='loginSuccessAlert']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render login success alert', () => {
        component.setState({
            showSuccessMessage: false
        });

        const wrapper = component.find(`[data-test='loginSuccessAlert']`)
        expect(wrapper.length).toBe(0);
    });

    it('Should not render login success alert', () => {
        component.setState({
            hasLoginFailed: true
        });

        const wrapper = component.find(`[data-test='loginErrorAlert']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render login success alert', () => {
        component.setState({
            hasLoginFailed: false
        });

        const wrapper = component.find(`[data-test='loginErrorAlert']`)
        expect(wrapper.length).toBe(0);
    });
});