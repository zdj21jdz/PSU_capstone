/* TC_S8 - Test Case - System test #8
    
Description:
    Buy Side properly adds new stock to portfolio

Parameters:
    - User Portfolio
    - Buy Stock
    - Stock Price

Pre-Condition:
    User has already had stock checked and is ready to purchase

Variables:
    - stock price
    - stock symbol

Post-Condition:
    User's portfolio is updated upon purchase of stock

Expected Results:
    Once the buy side has validated all checks to ensure stock exists,
        the user can then purchase the stock and add it to the portfolio
*/
import { configure, shallow } from 'enzyme';

// My Components
import { mock_portfolio_update } from '../../mocks/mock_portfolio_update';

// Set up testing adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Mock Axios
import axios from 'axios';
jest.mock("axios");

describe('TC_S8 - Mock stock purchase', ()=> {
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