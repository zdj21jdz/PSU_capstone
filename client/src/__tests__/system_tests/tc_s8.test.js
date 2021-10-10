/* TC_S8 - Test Case - System test #8
    
Description:
        Website will show an error to non-existent pages 

Parameters:
        Bad URL (does not exist in app) 

Pre-Condition:
        User is logged in and authorized 

Variables:
        URL parameters 

Post-Condition:
        PageNotFound rendered

Expected Results:
        When an authenticated user tries to navigate to a 
        non-existent page, the web app will 
        instead show an error 

*/

import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { MemoryRouter} from 'react-router'
import { Route } from 'react-router-dom';

// My Components
import { TestLogin } from '../../Pages/TestLogin';
import { Dashboard } from '../../components/dashboard';
import { PageNotFound } from '../../Pages/NotFound';
import App from '../../App';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

let pathMap = {};

function randomPathGen(length) {
    var result           = '/';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

describe('TC_S8 - Test Non-Auth user', ()=> {
    beforeAll(() => {
        const component = shallow(<App/>);
        pathMap = component.find(App).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
          }, {});
          console.log(pathMap)
      })

      it('TC_S8.1 - TestLogin component should show for root', () => {
        expect(pathMap['/']).toBe(TestLogin);
      })

      it('TC_S8.2 - Dashboard should be shown for home', () => {
        expect(pathMap['/home']).toBe(Dashboard);
      })

     // Test 10 random paths
      for(var i = 0; i < 10; i++) {
          let randomPath = randomPathGen(6);
          
          it('TC_S8.3 - PageNotFound shown for random pages', () => {
            expect(pathMap[randomPath]).toBe(PageNotFound);
          })
      }

      // // Re-use this for pen-test suite
    //   it('PageNotFound shown for random pages', () => {
    //     expect(pathMap['/..']).toBe(PageNotFound);
    //   })
});
