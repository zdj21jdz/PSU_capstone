/* TC_S9 - Test Case - System test #9
    
Description:
        Website will not show any pages to a non-authenticated user 

Parameters:
        URL (Both non-existent and real) 

Pre-Condition:
        User is not logged in 

Variables:
        URL parameters 

Post-Condition:
        Render "Page not found"

Expected Results:
        When an un-authenticated user tries to navigate to a page (whether it exists or not), the web app will instead show an error 

*/

import React from 'react';
import { configure, shallow } from 'enzyme';

// My Components
import Dashboard from '../../components/dashboard';
import PageNotFound from '../../Pages/NotFound';
import ZNav from '../../components/Custom_Nav/z_nav';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('TC_S9 - Test Non-Auth user', ()=> {
    // Set a authorized wrapper and un-auth'd wrapper
    const authed_wrapper = shallow(<Dashboard />);
    const unauth_wrapper = shallow(<Dashboard />);

    it('Dashboard renders for authorized user', () => {
        // Set username
        authed_wrapper.setProps({location: {state: {username: 'test'}}});

        // Should not render "PageNotFound"
        expect(authed_wrapper.find(PageNotFound)).toHaveLength(0)
        // Should render components
        expect(authed_wrapper.find(ZNav)).toHaveLength(1)
    })

    it('PageNotFound for Un-Authed User', () => {
        // Non-Auth'd users have undefined username
        //      no need to set props
        expect(unauth_wrapper.find(PageNotFound)).toHaveLength(1)

        // Components don't render
        expect(unauth_wrapper.find(ZNav)).toHaveLength(0)
    })
    
    // // Re-use this for pen-test suite
    //   it('PageNotFound shown for random pages', () => {
    //     expect(pathMap['/..']).toBe(PageNotFound);
    //   })
});
