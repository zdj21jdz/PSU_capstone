/* TC_U1 - Test Case - Unit test #1
    
Description:
        User can login via the portal

Parameters:
    - Username
    - Password

Pre-Condition:
    - User is not loged in

Variables:
    - Valid Username
    - Valid Password

Post-Condition:
    - Successful user log in

Expected Results:
    - The user_login function returns "true"/valid login
*/
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import TestLogin from '../../Pages/TestLogin';
import { Button } from '@mui/material';

configure({ adapter: new Adapter() });

    describe('TC_U1 - Test Login Portal - <TestLogin />', ()=> {
        const wrapper = shallow(<TestLogin />);

        it('TC_U1.1 - Check for username/password input', ()=> {

            //There should be only one form
            expect(wrapper.find('form')).toHaveLength(1)

            //Form should have only 2 inputs
            expect(wrapper.find('input')).toHaveLength(2)

            //Verify existance of username input
            expect(wrapper.find('input#name')).toHaveLength(1)
            expect(wrapper.find('input#name').type()).toEqual('input')

            //Verify existance of password input
            expect(wrapper.find('input#pass')).toHaveLength(1)
            expect(wrapper.find('input#pass').type()).toEqual('input')

        });

        it('TC_U1.2 - Check for LOGIN button', () => {

            //Verify existance of LOGIN button
            expect(wrapper.find(Button)).toHaveLength(1)

            //Button should have text "LOGIN"
            expect(wrapper.find(Button).text()).toEqual('Login')

        });

        it('TC_U1.3 - Check for Login Help Divs', () => {
            //Verify existance of "login-help" div
            expect(wrapper.find('div#login-help')).toHaveLength(1)
        });

        it('TC_U1.4 - Check initals states', () => {
            //Check initial state of login page - user/pass
            expect(wrapper.state().username).toEqual('');
            expect(wrapper.state().password).toEqual('');
            expect(wrapper.state().redirect).toEqual(null);
        });

        it('TC_U1.5 - Send response to DB when LOGIN is clicked', () => {
            // // //Simulate button click with inputs
            //Update state with user info
            expect(wrapper.state().username).toEqual('');
            wrapper.setState({username: 'test'});
            expect(wrapper.state().username).toEqual('test');

            //Find and click button
            expect(wrapper.find(Button)).toHaveLength(1)
            wrapper.find(Button).simulate('click', {
                preventDefault: () => {},
            });
        });

    });

