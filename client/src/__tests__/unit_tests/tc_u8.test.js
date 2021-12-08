/* TC_U8 - Test Case - Unit test #8
    
Description:
        Proper Logic for BUY Side

Parameters:
        Valid user session

Pre-Condition:
        User is on Buy/Sell ready to buy stock

Variables:
        - User's stock
        - Buy Quantity

Post-Condition:
        Proper messages are shown for scenarios

Expected Results:
        They Buy Side ensures stock exists and returns stock price

*/

import { configure } from 'enzyme';

// My Components
import { mock_buysell } from '../../mocks/mock_buysell';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Configure adapter
configure({ adapter: new Adapter() });

describe('TC_U8 - Test Buy Logic', ()=> {
     
    it('Ensure stock retrieves price', () => {
        const stock = 'AAPL'
        const result = mock_buysell(stock, test='price');

        // Ensure 1 radio button is slected
        expect(result).toEqual(130.45);
    })

    it('errors if price DNE', () => {
        const goodStock = 'AAPL'
        const badStock = 'jskfljdskl'

        const goodResult = mock_buysell(goodStock, test="stock");
        const badResult = mock_buysell(badStock, test="stock");

        // Buy/Sell handles each value as expected
        expect(goodResult).toEqual(true);
        expect(badResult).toEqual('Stock DNE');
    })
})
