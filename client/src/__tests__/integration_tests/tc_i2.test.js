/* TC_I2 - Test Case - Integration test #2
    
Description:
        Website will render after new changes are made

Parameters:
        URL endpoints to render

Pre-Condition:
        User is Authenticated

Variables:
        URL parameters, location.state.username

Post-Condition:
        Pages are properly rendered

Expected Results:
        Pages will still render after new changes are made.
        This test will be used prior to pushing a new change

Notes:
// Test to make sure general components of website still load after a push
// Run after each new feature
*/
// Import Libraries
import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// My Components
import App from '../../App';

// Test Set-up
configure({ adapter: new Adapter() });
let pathMap = {};

describe('TC_I2 - Check website with Authd user', ()=> {
    // Render App and authenticate user
    const component = shallow(<App/>);
    component.setProps({location: {state: {username: 'test'}}});

    // Create path map to show all endpoints
    beforeAll(() => {
        pathMap = component.find(App).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
          }, {});
      })

    // Render the pages
    it('Should render all pages in pathmap', () => {
        for (pathKey in pathMap) {
            let renderedComponent = pathMap[pathKey];
            render(<renderedComponent />)
        }
    })
});