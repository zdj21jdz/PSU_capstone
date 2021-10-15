/* TC_U3 - Test Case - Unit test #3
    
Description:
        Login portal throws error for incorrect username/password

Parameters:
    - Username
    - Password

Pre-Condition:
    - User is not loged in

Variables:
    - Invalid Username
    - Invalid Password

Post-Condition:
    - Error message sent

Expected Results:
    - "Invalid Credentials" is sent
*/
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mock_login } from '../../mocks/mock_login';

configure({ adapter: new Adapter() });

jest.mock('axios');
import axios from 'axios';

describe('Login tests', () => {
    describe('login function', () => {
      const submittedUsername = 'test';
      const submittedPass = 'badpassword';
  
      beforeEach(() => {
        axios.post.mockResolvedValue({data: 'Invalid Credentials!'});
      });
  
      it('should call endpoint with username/pass', () => {
        mock_login(submittedUsername, submittedPass);
        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/logins',
          { postData: { submittedUsername, submittedPass }},
          {"headers": {"Content-Type": "application/json"}},
        );
      });
    });
  });