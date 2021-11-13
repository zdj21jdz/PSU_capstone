/* TC_U6 - Test Case - Unit test #6
    
Description:
        BuySell Page renders properly

Parameters:
        Valid user session

Pre-Condition:
        User has already authenticated through page login

Variables:
        username

Post-Condition:
        Username is shown on navbar, components on page render properly

Expected Results:
        The Buy/Sell page is personalized with user data

*/

import React from 'react';
import { configure, shallow } from 'enzyme';
import { Link } from "react-router-dom";

// My Components
import BuySell from '../../components/BuySell';
import ZNav from '../../components/Custom_Nav/z_nav';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('TC_U6 - Test Non-Auth user', ()=> {
    
    it('BuySell renders username in navbar', () => {
        // Set a authorized wrapper
        const authed_wrapper = shallow(<BuySell />);
        authed_wrapper.setProps({location: {state: {username: 'test'}}});

        // Make sure navbar renders
        expect(authed_wrapper.find(ZNav)).toHaveLength(1)
    })

    it('Navbar shows username in logout button', () => {
        // Set username for navbar
        const nav_wrapper = shallow(<ZNav />);
        nav_wrapper.setProps({username: 'test'});

        // Check for logout link
        expect(nav_wrapper.find(Link)).toHaveLength(3)

        // Check text
        expect(nav_wrapper.text().includes('Logout - Test'))
    })
})
