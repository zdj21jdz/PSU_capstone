/* TC_I8 - Test Case - Integration test #8
    
Description:
        Sell Stock creates proper API Call

Parameters:
    - API call

Pre-Condition:
    - User is authenticated, on Buy/Sell page

Variables:
    - Symbol

Post-Condition:
    - Proper API call made

Expected Results:
    - Ensures that the API call is correct
*/
import { configure } from 'enzyme';

// My Components
import { mock_portfolio_update } from '../../mocks/mock_portfolio_update';

// Set up testing adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Mock Axios
import axios from 'axios';
jest.mock("axios");

describe('TC_I8 - Sell API Call testing', ()=> {
    // Load fake user Data
    const fakeData = {
        sym: 'MSFT',
        quant: 2,
        price: 200.00
    }

    // Set up Post Data return
    const submittedSymbol = fakeData.sym;
    const submittedPrice = fakeData.price;

    // Set expected return message
    const expectedMsg = 'Update Successful!';

    it("Proper API call made", () => {
        // Set up mocked response
        axios.post.mockResolvedValue({ data: 'Update Successful!' });

        // RUN CALL
        const returnData = mock_portfolio_update(fakeData);

        // Ensure axios is called correctly
        expect(axios.post).toBeCalledWith(
            'http://localhost:5000/posts',
            { postData: { submittedSymbol, submittedPrice }},
            {"headers": {"Content-Type": "application/json"}},
        );

        // Expect success to returned
        expect(expectedMsg).toEqual('Update Successful!');
    });

});