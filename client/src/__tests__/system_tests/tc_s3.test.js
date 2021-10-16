/* TC_S3 - Test Case - System test #3
    
Description:
        Brute Force Login security

Parameters:
        Login page (/ and /logins)

Pre-Condition:
        User not authorized 

Variables:
        Bad/empty password and user 

Post-Condition:
        Error message shown, user unable to send requests 

Expected Results:
        After the 3rd login attempt, a user will be unable 
        to submit any more login request from the IP for 
        a period of time 
*/
/// Testing express-bouncer

// Import libraries
import React from 'react';
import { configure, shallow } from 'enzyme';

// My Components
import TestLogin from '../../Pages/TestLogin';
import { mock_login } from '../../mocks/mock_login';

// Set up adapter for tests
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Set up axios for mock API calls
jest.mock('axios');
import axios from 'axios';

describe('TC_S3 - Brute Force Login Security', () => {
    const submittedUsername = 'badUser'
    const submittedPass = 'badPass'
    const errMsg = 'Too many bad attempts! Please wait a few minutes'

    beforeEach(() => {
        axios.post.mockResolvedValue({data: errMsg});
      });

    it('Throws error on 3rd unsuccessful attempt', () => {
        // // Send of 3 bad requests
        const totalLogins = 3
        mock_login(submittedUsername, submittedPass, totalLogins);
    })
})