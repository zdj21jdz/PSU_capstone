/* TC_U9 - Test Case - Unit test #9
    
Description:
        Buy/Sell page renders properly when no stocks are owned

Parameters:
        Valid user session

Pre-Condition:
        User is on Buy/Sell with no stocks in portfolio

Variables:
        n/a

Post-Condition:
        Proper messages are shown for scenarios

Expected Results:
        The page will load, but the portfolio and sell options are blank

*/
import React from 'react';
import { configure, shallow } from 'enzyme';

// My Components
import BuySell from '../../Pages/BuySell';
import ZNav from '../../components/Custom_Nav/z_nav';

// Configure adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('TC_U9 - BuySell renders if user has no stocks', () => {
    // Set up initial props
    const buySellProps = {
        [`location.state.username`]: 'test',
        location: {
            state: {
                username: 'test',
                tokenExp: 9999999999
            }
        }
    }

    const jdata = {
        username: 'test',
        portfolio: { } // No stocks
    }

    const buySellState = {
        jdata: jdata,
        radio: null,
        buyPrice: null,
        buySym: null,
        isLoaded: true
    }

    // Build wrapper
    const wrapper = shallow(<BuySell {...buySellProps} />)
    wrapper.setState(buySellState)

    // Start testing
    it('has all the proper components', () => {
        // Check if it rendered properly
        expect(wrapper.find(ZNav)).toHaveLength(1)
        expect(wrapper.find('div.content-block')).toHaveLength(3)
    })

    it('Renders a message for no stocks', () => {
        // Check message is rendered under portfolio
        expect(wrapper.text().includes('You have no stocks!'));
    })
})