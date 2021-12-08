/* TC_S9 - Test Case - System test #9
    
Description:
    Sell Side properly removes stock from portfolio

Parameters:
    - User Portfolio
    - Sell stock

Pre-Condition:
    User has stocks available to sell in the portfolio

Variables:
    - stock symbol

Post-Condition:
    User's portfolio is updated upon purchase of stock

Expected Results:
    Ensures that all proper checks are made before the user sells
        the stock. Ensures proper API calls are made. Change is
        reflected on page
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

describe('TC_S9 - Mock stock sell', ()=> {
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

    it("It updates the User's portfolio", () => {
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