import React from 'react';
import { shallow } from 'enzyme';
import ProfileComponent from '../components/Profile/ProfileComponent';

const setUp = (props={}) => {
    const component = shallow(<ProfileComponent {...props} />)
    return component;
};

describe('Profile Component', () => {
    
    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = component.find(`[data-test='profileComponent']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render RMIT wall without errors', () => {
        const wrapper = component.find(`[data-test='wallComponent']`)
        expect(wrapper.length).toBe(1);
    });
    
    it('Should render time table without errors', () => {
        const wrapper = component.find(`[data-test='timetableComponent']`)
        expect(wrapper.length).toBe(1);
    });

    it('Should render profile picture without errors', () => {
        const wrapper = component.find(`[data-test='profileImg']`)
        expect(wrapper.length).toBe(1);
    });

    describe('Rendering time table item', () => {
        it('Should render 2 time table items', () => {
            const classes = [
                {
                    id:'dummy',
                    description:'dummy',
                    startTime:'dummy',
                    endTime:'dummy',
                    day:'dummy',
                    location:'dummy',
                },
                {
                    id:'dummy2',
                    description:'dummy2',
                    startTime:'dummy2',
                    endTime:'dummy2',
                    day:'dummy2',
                    location:'dummy2',
                }
            ]

            component.setState({
                classes:classes
            });

            const wrapper = component.find(`[data-test='timeTableItem']`)
            expect(wrapper.length).toBe(2);
        });

        it('Should not render any time table items', () => {
            const wrapper = component.find(`[data-test='timeTableItem']`)
            expect(wrapper.length).toBe(0);
        });
    });

    describe('Rendering posts', () => {
        it('Should render two posts without errors', () => {
            const posts = [
                {
                    id:'1',
                    content:'1',
                    datePosted:'1',
                    posterUsername:'1',
                },
                {
                    id:'2',
                    content:'2',
                    datePosted:'2',
                    posterUsername:'2',
                }
            ]
            component.setState({
                posts: posts
            });

            const wrapper = component.find(`[data-test='postComponent']`)
            expect(wrapper.length).toBe(2);
        });

        it('Should not render any posts', () => {
            const posts = [
                
            ]
            component.setState({
                posts: posts
            })
            
            const wrapper = component.find(`[data-test='postComponent']`)
            expect(wrapper.length).toBe(0);
        });

        it('Should show alert user when post successful', () => {
            component.setState({
                classMessage: 'Message'
            });

            const wrapper = component.find(`[data-test='alertMessage']`)
            expect(wrapper.length).toBe(1);
        });

        it('Should not show alert message if user does not post anything', () => {
            const wrapper = component.find(`[data-test='alertMessage']`)
            expect(wrapper.length).toBe(0);
        });
    });

});