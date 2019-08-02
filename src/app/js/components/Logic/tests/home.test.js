import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home  from '../Home'
import JSONops from '../JSONops'
// import renderer from 'react-test-renderer'
// import { shallow, mount } from 'enzyme';
// import { stub } from 'sinon';
import { render, fireEvent, cleanup,
   waitForElement, wait} from '@testing-library/react'
import {renderWithRouter} from '../../../utils'
import 'jest-dom/extend-expect'
//since this is a test it's not actually importing the real 'axios' but
//rather the axios in the __mocks__ folder
//import axiosMock  from '../../SideEffects/tests/__mocks__/axios'
import web3ioMock  from '../../SideEffects/tests/__mocks__/web3io'
import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId, asyncFetch } from '../../SideEffects/io/Jsonio';
import {fetchMock} from 'fetch-mock'
import _loadCurrentUserAccounts from '../../SideEffects/io/web3io';

//NB: There are no 'props' at the <App /> level. Testing using props
//has to take place in the child components

afterEach(cleanup);

const dataTrue = [
  {id: 7, STATUS: "NEW", RANKING: "NEWRANKING"},
  {"DATESTAMP":1545369526439,"ACTIVE":true,"DESCRIPTION":"alskdfjalj","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0xa864Ea9d142C0997572aD7a2077A67a30a853cc0","RANK":2,"EMAIL":"laskdfjlfj","CONTACTNO":"laskdfjlajf","NAME":"player1","id":3},
  {"DATESTAMP":1545301903330,"ACTIVE":true,"DESCRIPTION":"laskjfljk","CURRENTCHALLENGERNAME":"AVAILABLE","CURRENTCHALLENGERID":0,"ACCOUNT":"0x2dCC1bd7852819026981B48479b8C3BE5056C0cd","RANK":3,"EMAIL":"aslkdfj","CONTACTNO":"alskjdflaj","NAME":"player2","id":2},
  {"id":1,"NAME":"player3","CONTACTNO":"","EMAIL":"","RANK":5,"ACCOUNT":"0x0f124b4C7Ccb22c79B3A95BB92188a810802ea26","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545369526437},
  {"id":4,"NAME":"player4","CONTACTNO":"","EMAIL":"","RANK":1,"ACCOUNT":"0xA87b6b69C139d414D2ca80744dB16172f997a7f7","CURRENTCHALLENGERID":5,"CURRENTCHALLENGERNAME":"player5","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":5,"NAME":"player5","CONTACTNO":"","EMAIL":"","RANK":6,"ACCOUNT":"0x3dA1f7f1937985Da9baf87a9b934A50B55981E8E","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"player4","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301970660},
  {"id":6,"NAME":"player6","CONTACTNO":"","EMAIL":"","RANK":4,"ACCOUNT":"0x23fCa109110F043847bb0Ca87805f3642D8B7Dc7","CURRENTCHALLENGERID":0,"CURRENTCHALLENGERNAME":"AVAILABLE","DESCRIPTION":"","ACTIVE":true,"DATESTAMP":1545301853807}
];

//jest.mock('axios');
jest.mock("../../SideEffects/io/Jsonio");
jest.mock('../../SideEffects/io/web3io');

//ensure describe blocks don't overlap
//default approach is RTL unless otherwise specified
describe('<Home/> ', () => {

  //default values, override in tests if necessary
  const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';
  const globalRankingData = [{RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}]
  const url = '/'
  //Functions:
  const historyMock = { push: jest.fn() };
  const onClick = jest.fn();
  const onAfterUserUpdate = jest.fn();
  const newrankId = jest.fn();
  const viewingOnlyCB = jest.fn();

  const userAccountsArray =
   [
       { address: '0x847700B781667abdD98E1393420754E503dca5b7',
         balance: 2.0,
         user: {
            username: 'player1',
            description: "test2",
            email: "test@test.com",
            owner: "0x847700B781667abdD98E1393420754E503dca5b7",
            picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
            rankingDefault: "5c81c1e944e81057efe3e2c8"
         }
       }
     ];

     const userObj = {
               username: 'player1',
               description: "test2",
               email: "test@test.com",
               owner: testAccountPlayer1Rinkeby,
               picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
               rankingDefault: "5c81c1e944e81057efe3e2c8"
          };

          const props  = {
            userAccounts: userAccountsArray,
            rankingListJSONdata: globalRankingData,
            rankingJSONdata: dataTrue,
            account: testAccountPlayer1Rinkeby,
            user: userObj,
            isRankingIDInvalid: false
          }


          it("Home", async () => {
            const spy_sendJSONDataWithRankingID = jest.spyOn(JSONops, '_sendJSONDataWithRankingID');
            spy_sendJSONDataWithRankingID.mockReturnValue(dataTrue);
            //override global mockResolvedValue with:
            //axiosMock.get.mockResolvedValueOnce({data: globalRankingData});
            //const mockFn = jest.fn();
            //mockFn.getMockName('_loadCurrentUserAccounts')


            const { getByTestId, getByText, debug, act } = renderWithRouter(<Home {...props}/>);
            //await wait(() => expect(getByTestId('BootstrapTableTestId')).toHaveTextContent('Player Name(Filter)'));
            await wait(() => expect(getByText('player3')).toBeInTheDocument());
            spy_sendJSONDataWithRankingID.mockRestore();
            //act(() => {
                //web3ioMock.get.mockResolvedValue({data: userAccountsArray});
            //});
   /* assert on the output */

            //debug();
              //await wait(() => expect(getByTestId("CurrentETHBal")).toHaveTextContent('SportRank has contributed:'));
            //await wait(() => expect('_loadCurrentUserAccounts').toHaveBeenCalled());
          });
  });
