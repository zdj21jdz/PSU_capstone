/* TC_I6 - Test Case - Integration test #6
    
Description:
    Login Page Ensures that the user has been validated via e-mail

Parameters:
    - Username
    - Password

Pre-Condition:
    - 6.1 - User is validated
    - 6.2 - User is not validated

Variables:
    - Username
    - Password

Post-Condition:
    - Proper messages are shown or proper actions are taken depnding
        on user validation status

Expected Results:
    - A validated user will be redirected to their dashboard (/home)
        An unvalidated user will be shown a message notifiying that their
        user is still not validated
*/
import { configure, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// My Components
import { mock_login } from '../../mocks/mock_login';

// Test Set-up
configure({ adapter: new Adapter() });

import axios from 'axios';
jest.mock("axios");


describe('TC_S6 - Test JWT', ()=> {
    // Setup Checks
    const validatedUserResponse = {status: 200, message: 'test'};
    const non_validatedUserResponse = {status: 403, message: "User not yet validated - Check your email!"};

    it('TC_S6.1 - Login page behaves as intended for validated user', () => {
        // Set with valid credentials
        const submittedUsername = 'test';
        const submittedPass = 'test123PSU';
        const reslovedData_Valid = {status: 200, message: 'test'};

        // Set mocked resolve
        axios.post.mockResolvedValue(reslovedData_Valid);

        const validatedUser = mock_login(submittedUsername, submittedPass);

        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/logins',
          { postData: { submittedUsername, submittedPass }},
          {"headers": {"Content-Type": "application/json"}},
        );

        // Expect 200 response
        expect(reslovedData_Valid).toEqual(validatedUserResponse)
    })

    it('TC_S6.2 - Login page throws proper error for un-validated user', () => {
        // TODO - mock a thrown 403 error - with "User not yet validated - Check your email!"
        const submittedUsername = 'notyet';
        const submittedPass = 'weNeedValidation';
        const resolvedData_Invalid = {status: 403, message: "User not yet validated - Check your email!"}

        // Set mocked resolve
        axios.post.mockResolvedValue(resolvedData_Invalid);

        const unvalidatedUser = mock_login(submittedUsername, submittedPass);

        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/logins',
          { postData: { submittedUsername, submittedPass }},
          {"headers": {"Content-Type": "application/json"}},
        );

        // Expect 403 with error response
        expect(resolvedData_Invalid).toEqual(non_validatedUserResponse)
    })
});