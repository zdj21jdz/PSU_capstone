/* TC_U7 - Test Case - Unit test #7
    
Description:
        Proper Logic for Sell Side

Parameters:
        Valid user session

Pre-Condition:
        User is on Buy/Sell ready to sell stock

Variables:
        - User's stock
        - Sell Quantity

Post-Condition:
        Proper messages are shown for scenarios

Expected Results:
        The sell portion  of the page will implement certain checks
            to ensure the user has enough stock to sell, and is only
            selling on ticker at a time

*/

import React from 'react';
import { configure, shallow } from 'enzyme';

// My Components
import { mock_buysell } from '../../mocks/mock_buysell';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// // Set props to be passed to BuySell Component
// const buySellProps = {
//         state: { 
//             username: 'test', 
//             tokenExp: 1637515252,
//             buyPrice: null,
//             buySym: null,
//             isLoaded: true,
//             radio: null,
//             jdata: {
//                 _id: "6150ef390007dc4a62847314",
//                 portfolio: {
//                     stocks: {
//                         APPL: {
//                             current_price: 150.3,
//                             quantity: 13
//                         }
//                     }
//                 },
//                 username: "test"
//             }
//         },
//         location: {state: {username: 'test'}}
//     }

// Configure adapter
configure({ adapter: new Adapter() });

import axios from 'axios';
jest.mock("axios");

describe('TC_U7 - Test Sell Logic', ()=> {
     
    it('Ensure one radio is clicked', () => {
        const selected = 1
        const expected = mock_buysell(selected, test='Radio')
        const badResult = mock_buysell(3, test='Radio');

        // Ensure 1 radio button is slected
        expect(expected).toEqual(selected);

        // Ensure additional radio buttons results in "error"
        expect(badResult).toEqual('error')
    })

    it('Ensure user has enough stock to sell', () => {
        const maxStock = 20;
        const badValue = 23;
        const goodValue = 5;

        const testArray = [maxStock, badValue, goodValue];

        const result = mock_buysell(testArray, test="limit")

        // Buy/Sell handles each value as expected
        expect(result).toEqual(true);
    })
})
