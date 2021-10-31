/* TC_I4 - Test Case - Integration test #4
    
Description:
        JWT Received upon User Authentication 

Parameters:
    - Token

Pre-Condition:
    - User is not authentication 

Variables:
    - State.token 

Post-Condition:
    - User has token within their state upon auth 

Expected Results:
    - Ensures that JWT is received by the client 
        upon user authentication 
*/
import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import jwt from 'jsonwebtoken';

// My Components
import { mock_login } from '../../mocks/mock_login';

// Test Set-up
configure({ adapter: new Adapter() });

import axios from 'axios';
jest.mock("axios");


describe('TC_I4 - JWT Received upon User Authentication ', () => {
    ///// Test Setup /////
    // Set Username and mocked IAT/secrete
    const username = 'test'
    const secret = 'test_secret';
    const iat = 1635701127;
    const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzU3MDExMjcsImV4cCI6MTYzNTcwNDcyN30.P08aliH4aM3PxJz6-TdCYlgHfU5lITSRt0nYFphghKY';

    // Set jwt token that should be generated
    const testToken = jwt.sign({
        "username": username,
        "iat": iat
      }, secret,
      { expiresIn: '1h'}
    );

    it('Produces JWT on Proper Authentication', () => {
        const submittedUsername = username;
        const submittedPass = 'test123PSU';

        // Set mocked resolve
        axios.post.mockResolvedValue({ data: testToken });

        const tokenExp = mock_login(submittedUsername, submittedPass);

        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/logins',
          { postData: { submittedUsername, submittedPass }},
          {"headers": {"Content-Type": "application/json"}},
        );

        // Expect token to be correct
        expect(testToken).toEqual(correctToken)

    })

})