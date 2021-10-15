/* TC_U2 - Test Case - Unit test #2
    
Description:
        Username shown in navbar 

Parameters:
        Valid username

Pre-Condition:
        User is logged into website 

Variables:
        username

Post-Condition:
        Username is shown on navbar 

Expected Results:
        Once the user is logged in, they will see their user 
            name next to the “logout” icon 
            (ex – user Zach will have “Logout Zach”) 

*/

import React from 'react';
import { configure, shallow } from 'enzyme';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

// My Components
import Dashboard from '../../components/dashboard';
import ZNav from '../../components/Custom_Nav/z_nav';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('TC_U2 - Test Non-Auth user', ()=> {
    
    it('Dashboard renders username in navbar', () => {
        // Set a authorized wrapper
        const authed_wrapper = shallow(<Dashboard />);
        authed_wrapper.setProps({location: {state: {username: 'test'}}});

        // Make sure navbar renders
        expect(authed_wrapper.find(ZNav)).toHaveLength(1)
    })

    it('Navbar shows username in logout button', () => {
        // Set username for navbar
        const nav_wrapper = shallow(<ZNav />);
        nav_wrapper.setProps({username: 'test'});

        // Check for logout link
        expect(nav_wrapper.find(Link)).toHaveLength(1)

        // Check text
        expect(nav_wrapper.text().includes('Logout - Test'))
    })
})
