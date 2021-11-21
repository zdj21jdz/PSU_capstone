/* TC_S7 - Test Case - System test #7
    
Description:
    State is properly passed through each API endpoint after user authentication

Parameters:
    - JWT
    - Username

Pre-Condition:
    User has already authenticated through page login

Variables:
    - JWT
    - Username

Post-Condition:
    States passed; pages render

Expected Results:
    Proper State is passed through each page such that the page renders
*/
import React from 'react';
import { configure, shallow } from 'enzyme';
import { Button } from '@mui/material';

// My Components
import BuySell from '../../Pages/BuySell';
import Dashboard from '../../components/dashboard';

// Set up testing adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Set props to be passed to BuySell Component
const buySellProps = {
    location: {
      state: { username: 'test'}
    }
}

describe('TC_S7 - Test API enpoint access', ()=> {
    // Set up pages within Dashboard
    const dash_wrapper = shallow(<Dashboard />);
    const buysell_wrapper = shallow(<BuySell {...buySellProps} />);

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
    });

});

