/* TC_S5 - Test Case - System test #5
    
Description:
        Dashboard checks for valid JWT 

Parameters:
        - JWT Token

Pre-Condition:
        - 5.1 - User is Authenticated
        - 5.2 - User is Un-Auth'd
        - 5.3 - User has an expired token

Variables:
        - JWT
        - Expire Time

Post-Condition:
        - Valid JWT - Dashboard Renders
        - Invalid JWT - Page Not Found Renders
        - Expired JWT - Token Expired Renders

Expected Results:
        The Dashboard will render only if the user has a valid JWT; 
        If the token is invalid, it will redirect to page not found; 
        if the token has expired, it will show token expired page.

*/
import React from 'react';
import { configure, shallow } from 'enzyme';

// My Components
import Dashboard from '../../components/dashboard';
import PageNotFound from '../../Pages/NotFound';
import SessionExpired from '../../Pages/SessionExpired';
import ZNav from '../../components/Custom_Nav/z_nav';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('TC_S5 - Test JWT', ()=> {
    // Set a authorized wrapper and un-auth'd wrapper
    const authed_wrapper = shallow(<Dashboard />);
    const unauth_wrapper = shallow(<Dashboard />);
    const expired_wrapper = shallow(<Dashboard />);

    it('TC_S5.1 - Dashboard renders for Valid JWT token', () => {
        // Set username and valid token
        authed_wrapper.setProps({location: {state: {
            username: 'test',
            tokenExp: 9999999999
        }}});

        // Should not render "PageNotFound" or "SessionExpired"
        expect(authed_wrapper.find(PageNotFound)).toHaveLength(0)
        expect(authed_wrapper.find(SessionExpired)).toHaveLength(0)
        
        // Should render components within dashboard
        expect(authed_wrapper.find(ZNav)).toHaveLength(1)
    })

    it('TC_S5.2 - PageNotFound for Invalid Token', () => {
        // Invalid Token will render "PageNotFound"
        expect(unauth_wrapper.find(PageNotFound)).toHaveLength(1)

        // Components don't render
        expect(unauth_wrapper.find(ZNav)).toHaveLength(0)
        // SessionExpired won't render
        expect(unauth_wrapper.find(SessionExpired)).toHaveLength(0)
    })

    it('TC_S5.3 - SessionExpired for Expired Token', () => {
        // Set expired token
        // Set username and valid token
        expired_wrapper.setProps({location: {state: {
            username: 'test',
            tokenExp: 0
        }}});

        // If the token expired, the 
        expect(expired_wrapper.find(SessionExpired)).toHaveLength(1)

        // Components don't render since session expired
        expect(expired_wrapper.find(ZNav)).toHaveLength(0)
        // Page not found won't render
        expect(expired_wrapper.find(PageNotFound)).toHaveLength(0)
    })
});
