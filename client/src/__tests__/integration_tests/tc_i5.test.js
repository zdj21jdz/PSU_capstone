/* TC_I5 - Test Case - Integration test #5
    
Description:
    Ensure proper API call is executed for NewUser Sign up

Parameters:
    - Email
    - Username
    - Password
    - Confirmed Password

Pre-Condition:
    - User is not created in the database

Variables:
    - Email
    - Username
    - Password
    - Confirmed Password

Post-Condition:
    - Proper API endpoint is called with correct data

Expected Results:
    - The API will be called upon data submission to the database.
        After the data is sent, proper response message is recieved
*/
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// My Components
import { mock_newUser } from '../../mocks/mock_newUser';

// Test Set-up
configure({ adapter: new Adapter() });

import axios from 'axios';
jest.mock("axios");

describe('TC_I5 - Proper API call is made from NewUser page ', () => {

    it('Properly handles axios request to /verifyEmail', () => {
        const submittedUsername = 'test';
        const submittedPass = 'test123PSU';
        const submittedEmail = 'test@test.com'


        // Set mocked resolve
        axios.post.mockResolvedValue({ data: 'success' });

        // Call new user
        const mockUserReturnValue = mock_newUser(submittedUsername,submittedPass, submittedEmail)

        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/verifyEmail',
          { postData: { submittedUsername, submittedPass, submittedEmail }},
          {"headers": {"Content-Type": "application/json"}},
        );

    })

})