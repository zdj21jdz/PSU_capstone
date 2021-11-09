/* TC_U5 - Test Case - Unit test #5
    
Description:
    NewUser page properly Renders

Parameters:
    - Page components

Pre-Condition:
    - No User validated

Variables:
    - components

Post-Condition:
    - all pieces of page are loaded

Expected Results:
    - The new user page renders properly with all components
*/
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NewUser from '../../Pages/NewUser';
import { Button } from '@mui/material';

configure({ adapter: new Adapter() });

    describe('TC_U5 - Test Login Portal - <NewUser />', ()=> {
        const wrapper = shallow(<NewUser />);

        it('TC_U5.1 - Check for all input', ()=> {

            //There should be only one form
            expect(wrapper.find('form')).toHaveLength(1)

            //Form should have only 2 inputs
            expect(wrapper.find('input')).toHaveLength(4)

            //Verify existance of email input
            expect(wrapper.find('input#email')).toHaveLength(1)
            expect(wrapper.find('input#email').type()).toEqual('input')

            //Verify existance of username input
            expect(wrapper.find('input#name')).toHaveLength(1)
            expect(wrapper.find('input#name').type()).toEqual('input')

            //Verify existance of password input
            expect(wrapper.find('input#pass')).toHaveLength(1)
            expect(wrapper.find('input#pass').type()).toEqual('input')

            //Verify existance of password input
            expect(wrapper.find('input#confPass')).toHaveLength(1)
            expect(wrapper.find('input#confPass').type()).toEqual('input')

        });

        it('TC_U5.2 - Check for Login Help Divs', () => {
            //Verify existance of "login-help" div
            expect(wrapper.find('div#login-help')).toHaveLength(1)
        });

        it('TC_U5.3 - Check initals states', () => {
            //Check initial state of login page - user/pass
            expect(wrapper.state().username).toEqual('');
            expect(wrapper.state().password).toEqual('');
            expect(wrapper.state().email).toEqual('');
            expect(wrapper.state().redirect).toEqual(null);
        });

        it('TC_U5.4 - Send response to DB when LOGIN is clicked', () => {
            // // //Simulate button click with inputs
            //Update state with user info
            expect(wrapper.state().username).toEqual('');
            wrapper.setState({username: 'test', email: 'test@email.com'});
            expect(wrapper.state().username).toEqual('test');
            expect(wrapper.state().email).toEqual('test@email.com');

            //Find and click button
            expect(wrapper.find(Button)).toHaveLength(1)
            wrapper.find(Button).simulate('click', {
                preventDefault: () => {},
            });
        });

    });

