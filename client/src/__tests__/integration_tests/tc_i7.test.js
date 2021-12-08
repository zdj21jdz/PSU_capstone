/* TC_I7 - Test Case - Integration test #7
    
Description:
        Buy Stock creates proper API Call to ALPHA 

Parameters:
    - API call

Pre-Condition:
    - User is authenticated, on Buy/Sell page

Variables:
    - Symbol

Post-Condition:
    - Proper API call made to ALPHA 

Expected Results:
    - Ensures that the API call to Alpha is correct, and
        data is properly parsed out
*/
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// My Components
import { mock_buysell_handler } from '../../mocks/mock_buysell_handler'

// Test Set-up
configure({ adapter: new Adapter() });

describe('TC_I7 - Proper API call sent, data handled properly', () => {
    ///// Test Setup /////
    // Set URL
    const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"

    // Set response data
    const correctData = {
        "Global Quote": {
            "01. symbol": "IBM",
            "02. open": "116.4900",
            "03. high": "116.5600",
            "04. low": "115.2700",
            "05. price": "116.0500",
            "06. volume": "5384548",
            "07. latest trading day": "2021-11-19",
            "08. previous close": "116.6600",
            "09. change": "-0.6100",
            "10. change percent": "-0.5229%"
        }
    }

    it('Properly Retrieves data and parses it', () => {
        const ibmPrice = mock_buysell_handler(url, 'IBM')

        expect(ibmPrice).toEqual(correctData['Global Quote']['05. price'])
    })

    it('Handles bad symbols correctly', () => {
        // Test when user has no input
        const undefSymbol = undefined;

        const undefResult = mock_buysell_handler(url, undefSymbol);
        expect(undefResult).toEqual('please provide a symbol')

        // Test a symbol that DNE
        const dneSymbol = mock_buysell_handler(url, 'Bad Symbol')
        expect(dneSymbol).toEqual('Symbol not found!');
    })

})