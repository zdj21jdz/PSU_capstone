/* TC_S4 - Test Case - System test #4
    
Description:
        SQL Injection Attacks

Parameters:
        Login page (/ and /logins)

Pre-Condition:
        User not authorized 

Variables:
        Malicious code aimed for exploiting Mongo DB instances 

Post-Condition:
        Generic error message thrown, input properly parsed 

Expected Results:
        Ensure that input is cleaned such that malicious input 
            cannot execute to get more info. From mongo DB 
*/

// Test against SQL injection attack for MONGO DB
import fs from 'fs';
import path from 'path';

// Read injection attacks from file
// from - https://github.com/cr0hn/nosqlinjection_wordlists/blob/master/mongodb_nosqli.txt
const file = path.join(__dirname, "./", "mongo_inj.txt");
const fdr = fs.readFileSync(file, "utf8", () => {
  return data;
});

const payloads = fdr.split('\n')

// Set up test environment
import { mock_login } from '../../mocks/mock_login';
import { configure } from 'enzyme';

// Set up adapter for tests
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Set up axios for mock API calls
jest.mock('axios');
import axios from 'axios';

// Test Payloads against login page
describe('TC_S4 - Test NoSQL injection', () => {
    const errMsg = 'Too many bad attempts! Please wait a few minutes'

    beforeEach(() => {
        axios.post.mockResolvedValue({data: errMsg});
    });

    it('Rejects malicious login attempts', () => {
        payloads.forEach ((payload, index) => {
            let submittedUsername = payload
            let submittedPass = payload
            mock_login(submittedUsername, submittedPass);
        })
    })
    
})