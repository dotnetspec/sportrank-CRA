import React from 'react'
import {
  BrowserRouter
} from 'react-router-dom'
import App from '../App'
import renderer from 'react-test-renderer'
import {
  shallow,
  mount
} from 'enzyme';
import {
  stub
} from 'sinon';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react'
import {
  renderWithRouter
} from '../../../utils'
import 'jest-dom/extend-expect'
//since this is a test it's not actually importing the real 'axios' but
//rather the axios in the __mocks__ folder
import axiosMock from '../../SideEffects/tests/__mocks__/axios'
import web3ioMock from '../../SideEffects/tests/__mocks__/web3io'
import {
  _loadsetJSONData,
  _loadsetRankingListJSONData,
  getNewRankId,
  asyncFetch
} from '../../SideEffects/io/Jsonio';
import {
  fetchMock
} from 'fetch-mock'
import _loadCurrentUserAccounts from '../../SideEffects/io/web3io';
import {
  specificrankingdata
} from '../../../../../../test-fixtures/jsonbin/specificrankingdata'
import {
  cleanedUpSRContractData
} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'


//NB: There are no 'props' at the <App /> level. Testing using props
//has to take place in the child components

afterEach(cleanup);

//jest.mock('axios');
jest.mock("../../SideEffects/io/Jsonio");
jest.mock('../../SideEffects/io/web3io');

//ensure describe blocks don't overlap
//default approach is RTL unless otherwise specified
describe('<App/> ', () => {

      //default values, override in tests if necessary
      const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';
      const globalRankingData = [{
        RANKINGNAME: "mplayer1rank",
        RANKINGDESC: "mp1r",
        ACTIVE: true,
        RANKINGID: "5c875c79adeb832d3ec6732d"
      }]
      const url = '/'
      //Functions:
      const historyMock = {
        push: jest.fn()
      };
      const onClick = jest.fn();
      const onAfterUserUpdate = jest.fn();
      const newrankId = jest.fn();
      const viewingOnlyCB = jest.fn();

      //another way of adding property functions
      function setuserNameCB() {
        return null;
      }

      function dummyFunction() {
        return null;
      }

      const userAccountsArray = [{
        address: '0x847700B781667abdD98E1393420754E503dca5b7',
        balance: 2.0,
        user: {
          username: 'player1',
          description: "test2",
          email: "test@test.com",
          owner: "0x847700B781667abdD98E1393420754E503dca5b7",
          picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          rankingDefault: "5c81c1e944e81057efe3e2c8"
        }
      }];

      const userObj = {
        username: 'player1',
        description: "test2",
        email: "test@test.com",
        owner: testAccountPlayer1Rinkeby,
        picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
        rankingDefault: "5c81c1e944e81057efe3e2c8"
      };

      const props = {
        userAccounts: userAccountsArray,
        rankingListJSONdata: globalRankingData,
        account: testAccountPlayer1Rinkeby,
        user: userObj
      }

      xit('Account dropdown on click Create New display', async () => {
            const props = {
              userAccounts: cleanedUpSRContractData,
              username: cleanedUpSRContractData[0].username,
              account: testAccountPlayer1Rinkeby,
              onAfterUserUpdate: (e) => dummyFunction(),
              rankingJSONdata: specificrankingdata,
              balance: 4.0,
              setuserNameCB: (e) => setuserNameCB()
            }

            const {
              debug,
              getByText,
              getByTestId
            } = renderWithRouter( < App {
                ...props
              }
              />);
              //give the menu time to load
              await wait(() => getByTestId("menuitem3")); fireEvent.click(getByTestId("menuitem3"));
              //await wait(() => expect(getByText(/Create An Account Name/i)).toBeInTheDocument());
              expect(getByText(/Create An Account Name/i)).toBeInTheDocument();
            });


          xit("App ETH bal basic render w/o data", async () => {
            //override global mockResolvedValue with:
            //axiosMock.get.mockResolvedValueOnce({data: globalRankingData});
            //const mockFn = jest.fn();
            //mockFn.getMockName('_loadCurrentUserAccounts')


            const {
              getByTestId,
              getByText,
              debug,
              act
            } = renderWithRouter( < App / > );

            //act(() => {
            web3ioMock.get.mockResolvedValue({
              data: userAccountsArray
            });
            //});
            /* assert on the output */

            //debug();
            //await wait(() => expect(getByTestId("CurrentETHBal")).toHaveTextContent('SportRank has contributed:'));
            await wait(() => expect('_loadCurrentUserAccounts').toHaveBeenCalled());
          });

          //using the axiosmock file in __mocks__
          xit("App axios mock fetch call", async () => {
            //override global mockResolvedValue with:
            axiosMock.get.mockResolvedValueOnce({
              data: globalRankingData
            });
            const {
              getByTestId,
              getByText,
              debug
            } = renderWithRouter( < App / > );
            //debug();
            expect(getByTestId("loading")).toHaveTextContent('Loading ...');
            await wait(() => expect(getByText("mplayer1rank")).toBeInTheDocument());
          });


          xit('Displays De-Activate btn when ranking selected', async () => {

            // const historyMock = { push: jest.fn() };
            // const onClick = jest.fn();
            // const onAfterUserUpdate = jest.fn();
            // const newrankId = jest.fn();
            // const setviewingOnlyCB = jest.fn();
            // const setnewrankIdCB = jest.fn();
            // const _loadsetJSONData = jest.fn();
            // const _sendJSONDataWithRankingID = jest.fn();
            // const setrankingJSONdataCB = jest.fn();
            // const onClickRankingJoinSelected = jest.fn();
            // const setOnCallbackisCurrentUserActiveCB = jest.fn();
            //const onClickRankingJoinSelected = jest.fn();
            //const setspecificRankingOptionBtnsCB = jest.fn();

            // const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}
            // const { getByText, getByTestId } = render(<GlobalRankingJoinBtn
            //   setspecificRankingOptionBtnsCB={onClick}
            //   row={row}
            //   onAfterUserUpdate={onAfterUserUpdate}
            //   newrankId={newrankId}
            //   setviewingOnlyCB={setviewingOnlyCB}
            //   history={historyMock}
            //   setnewrankIdCB={setnewrankIdCB}
            //   _loadsetJSONData={_loadsetJSONData}
            //   rankingJSONdata={dataTrue}
            //   _sendJSONDataWithRankingID={_sendJSONDataWithRankingID}
            //   setrankingJSONdataCB={setrankingJSONdataCB}
            //   onClickRankingJoinSelected={onClickRankingJoinSelected}
            //   setOnCallbackisCurrentUserActiveCB={setOnCallbackisCurrentUserActiveCB}
            //   />);

            // fireEvent.click(getByText(/View/i));
            // //expect(onClick).toHaveBeenCalled();
            // //expect(onClickRankingJoinSelected).toHaveBeenCalled();
            // //expect(onAfterUserUpdate).toHaveBeenCalled();
            // //expect(setviewingOnlyCB).toHaveBeenCalled();
            // expect(setnewrankIdCB).toHaveBeenCalled();
            //expect(getByTestId('activatebtn-input')).toBeInTheDocument();

              const props = {
                userAccounts: cleanedUpSRContractData,
                isCurrentUserActive: true,
                rankingListJSONdata: globalRankingData,
                account: testAccountPlayer1Rinkeby,
                user: 'player1',
                setspecificRankingOptionBtnsCB: onClick,
                onAfterUserUpdate: onAfterUserUpdate,
                newrankId: newrankId,
                viewingOnlyCB: viewingOnlyCB,
                history: historyMock,
                data: globalRankingData
              }
              const {
                getByTestId,
                getByText
              } = renderWithRouter( < App {
                  ...props
                } url = {
                  url
                }
                />);

                console.log('globalRankingData', props.rankingListJSONdata)
                //expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();


                //await wait(() => getByTestId("menuitem3")); fireEvent.click(getByTestId("menuitem3"));
                // const joinbtn = await wait(() => getByTestId("0"));
                // joinbtn.fireEvent.click();
                await wait(() => fireEvent.click(getByText(/View/i)));
                //await wait(() => expect(getByText(/Create An Account Name/i)).toBeInTheDocument());
                //expect(getByText(/Create An Account Name/i)).toBeInTheDocument();
                expect(getByTestId('activatebtn-input')).toBeInTheDocument();
              });

            xit('RTL - check initial display', () => {

                const {
                  getByText,
                  debug
                } = renderWithRouter( < App {
                    ...props
                  }
                  />);
                  //debug();
                  expect(getByText(/List All Rankings/i)).toHaveTextContent('List All Rankings');
                  expect(getByText(/Update Profile/i)).toBeInTheDocument();
                  expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
                });

              //currently unable to mock the globalRankingData
              xit('loads and displays greeting', async () => {
                  //const url = '/'
                  const {
                    getByText,
                    getByTestId
                  } = renderWithRouter( < App url = {
                      url
                    }
                    />)
                    //const globalRankingData = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

                    axiosMock.get.mockResolvedValueOnce({
                      //data: { rankingListData: globalRankingData },
                      rankingListData: globalRankingData
                    })

                    const firstRowOfTableViewBtn = await getByTestId("0"); fireEvent.click(firstRowOfTableViewBtn);

                    //fireEvent.click(getByText('Load Greeting'))

                    // const greetingTextNode = await waitForElement(() =>
                    //   getByTestId('greeting-text')
                    // )

                    expect(axiosMock.get).toHaveBeenCalledTimes(1);
                    expect(axiosMock.get).toHaveBeenCalledWith(url);
                    expect(getByTestId('globalrankingviewbtn')).toHaveTextContent('View')
                    //expect(getByTestId('globalrankingviewbtn')).toHaveAttribute('disabled')
                  })

                //this test causes error: Cannot log after tests are done. Did you forget to wait for something async in your test?
                //Attempted to log "Warning: Can't perform a React state update on an unmounted component
                // xit('RTL - check elements rendered to DOM when render(<App />) (many e.g. most btns are not!)', () => {
                //   const { getByText } = renderWithRouter(<App />);
                //   expect (getByText('Sportrank HOME')).toBeInTheDocument();
                //   });

                //TODO: Need to figure out visibility in child components before coming back to
                //how this works at the App level
                xit('RTL - check btn visibility', () => {
                  // Render new instance in every test to prevent leaking state
                  // const historyMock = { push: jest.fn() };
                  // const onClick = jest.fn();
                  // const onAfterUserUpdate = jest.fn();
                  // const newrankId = jest.fn();
                  // const viewingOnlyCB = jest.fn();
                  //
                  // const row = {RANKINGNAME: "mplayer1rank", RANKINGDESC: "mp1r", ACTIVE: true, RANKINGID: "5c875c79adeb832d3ec6732d"}

                  //const { getByText, container, queryByTestId } = renderWithRouter(<App />);
                  const {
                    // queryByTestId,
                    // getByTestId,
                    // getElementById,
                    // rootNode,
                    getByText
                  } = renderWithRouter( < App / > );
                  //const ancestor = queryByTestId('app')



                  //const {queryByTestId} = render(/* Rendered HTML */)
                  //const ancestor = document.querySelector('[data-testid="app"]')
                  //const ancestor = queryByTestId(container, 'app')
                  //const descendant = queryByTestId('header')
                  //const nonExistantElement = queryByTestId('globalrankingviewbtn')

                  //expect(document.querySelector('[data-testid="app"]')).toBeInTheDocument()
                  //expect(document).toContainQuerySelector('[data-testid="app"]')

                  //expect(getElementById('app')).toBeInTheDocument()
                  //const root = rootNode.querySelector('.app')
                  //REVIEW: can be improved but ensures exists ...
                  expect(getByText(/Update Profile/i)).toHaveTextContent('Update Profile');

                  //expect(getByTestId('app')).toBeInTheDocument()

                  // expect(ancestor).toContainElement(descendant)
                  // expect(descendant).not.toContainElement(ancestor)
                  // expect(ancestor).not.toContainElement(nonExistantElement)

                  //looking for text that hasn't been rendered just causes error
                  //expect(getByText("De-Activate")).not.toBeVisible();
                  //expect(getByText("De-Activate")).not.toBeVisible();
                  //expect(getByText(container, 'De-Activate')).not.toBeVisible()
                  //expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeVisible()

                  // fireEvent.click(getByText(/View/i));
                  // expect(onClick).toHaveBeenCalled();
                  // expect(onAfterUserUpdate).toHaveBeenCalled();
                  // expect(newrankId).toHaveBeenCalled();
                  // expect(viewingOnlyCB).toHaveBeenCalled();
                });



                xit("RTL - List All Ranking btn should be visisble", () => {
                  // jest.mock('react-router', () => ({
                  //   withRouter: Comp => props => <Comp {...props} />,
                  // }))
                  const {
                    getByTestId,
                    container,
                    getByValue
                  } = renderWithRouter( < App / > );
                  //expect(container.innerHTML).toMatch('List All Rankings')
                  expect(getByValue(container, 'List All Rankings').toHaveTextContent('List All Rankings'))
                  //console.log(container.classList, container.id, container.innerHTML);
                  //expect(getByTestId('ListAllRankings')).toHaveAttribute('enabled')
                  //const container = render(<BrowserRouter><App /></BrowserRouter>)
                  //looking for text that hasn't been rendered just causes error
                  //expect(getByText("De-Activate")).not.toBeVisible();
                  //expect(getByText("List All Rankings")).toBeVisible();
                  //expect(document.querySelector('.ListAllRankings').innerHTML).toBe("List All Rankings")
                  //expect(getByTestId('ListAllRankings')).toHaveTextContent('List All Rankings')
                  //expect(getByText('List All Rankings')).toBeInTheDocument()
                });
              });
