/* TC_U4 - Test Case - Unit test #4
    
Description:
        JWT Generates token based on username and issued at time 

Parameters:
    - Valid username
    - time of request 

Pre-Condition:
    - N/A

Variables:
    - Username
    - IAT (issued_at_time)

Post-Condition:
    - JWT is generated with proper payload 

Expected Results:
    - The JSON Web Token (JWT) is generated based on when the 
        user requested it, and their user name making it 
        unique to each user upon authentication 
*/
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import jwt from 'jsonwebtoken';

// Mock function
import { mock_JwtGen } from '../../mocks/mock_JwtGen.js';

configure({ adapter: new Adapter() });

describe('TC_U4 - JWT Test', () => {
    it('should generate a token based off of username and iat', () => {
        const username = 'test';
        const token = mock_JwtGen(username);

        // Create token with same parameters
        const secret = 'test_secret';
        const iat = 1635701127;

        const test_token  = jwt.sign({
            "username": username,
            "iat": iat
          }, secret,
          { expiresIn: '1h'}
        );

        expect(token).toBe(test_token);
    })
})