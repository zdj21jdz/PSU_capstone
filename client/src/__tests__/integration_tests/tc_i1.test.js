/* TC_I1 - Test Case - Integration test #1
    
Description:
        Market Insights are generated based off user profile

Parameters:
    - User’s ticker symbol (I.e.- AAPL, TSLA) 

Pre-Condition:
    - User has equities in their portfolio 

Variables:
    - User's stock
    - Stock category 

Post-Condition:
    - Market insights are generated based on the stock’s category 

Expected Results:
    - Content will be generated based on the 
        composition of the user’s portfolio 
*/
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mock_insights } from '../../mocks/mock_insights';

configure({ adapter: new Adapter() });

jest.mock('axios');
import axios from 'axios';

describe('insights tests', () => {
    describe('insight function', () => {
      const uName = 'test';
  
      beforeEach(() => {
        axios.post
            .mockResolvedValue(
            {data:
                {
                    "_id": "6150ef390007dc4a62847314",
                    "username": "test",
                    "portfolio": {
                      "stocks": {
                        "APPL": {
                          "quantity": 1,
                          "current_price": 150.3
                        },
                        "MSFT": {
                          "quantity": 10,
                          "current_price": 300.12
                        }
                      }
                    }
                }
            });
      });
  
      it('should call endpoint with username/pass', () => {
        mock_insights(uName);
        expect(axios.post).toBeCalledWith(
          'http://localhost:5000/posts',
          { postData: { uName }},
          {"headers": {"Accept": "application/json",
                       "Content-Type": "application/json"}},
        );
      });
    });
  });