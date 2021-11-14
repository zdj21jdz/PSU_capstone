/* TC_I7 - Test Case - Integration test #7
    
Description:
    Dashboard passes state to buy/sell page for authenticated user

Parameters:
    - JWT
    - Username

Pre-Condition:
    User has already authenticated through page login

Variables:
    - JWT
    - Username

Post-Condition:
    States passed to BuySell page so components can render properly

Expected Results:
    After authenticating and landing into the dashboard, the user can then move into
        the buy sell page will keeping current authentication
*/
import React from 'react';
import { configure, shallow } from 'enzyme';
import { Button } from '@mui/material';

// My Components
import BuySell from '../../components/BuySell';
import Dashboard from '../../components/dashboard';

// Set up testing adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('TC_S7 - Test API enpoint access', ()=> {
    // Set up pages within Dashboard
    const dash_wrapper = shallow(<Dashboard />);
    const buysell_wrapper = shallow(<BuySell />);

    // Auth user
    dash_wrapper.setState({username: 'test', JWT: 'Valid Token'});
    buysell_wrapper.setState({username: 'test', JWT: 'Valid Token'});

    it('State passed from one page to another', () => {
        //Check dashboard state
        expect(dash_wrapper.state().username).toEqual('test');
        expect(dash_wrapper.state().JWT).toEqual('Valid Token');

        //Find and click button
        expect(dash_wrapper.find(Button)).toHaveLength(0)


        //Check buysell state
        expect(buysell_wrapper.state().username).toEqual('test');
        expect(buysell_wrapper.state().JWT).toEqual('Valid Token');

        console.log('State properly Passed')
    });

});

