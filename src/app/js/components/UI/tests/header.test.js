//REVIEW: Any way to improve tests? Click events are not being used, just set properties

import React from 'react'
import {
  renderWithRouter
} from '../../../utils'
import Header from '../Header'
//import JSONops from '../../Logic/JSONops'

import {
  //render,
  //fireEvent,
  cleanup,
  //waitForElement,
  //debug
} from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {
  specificranking
} from '../../../../../../test-fixtures/jsonbin/specificranking'
import {
  cleanedUpSRContractData
} from '../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData'
import {
  copyconsoletemp
} from '../../../../../../test-fixtures/jsonbin/copyconsoletemp'
// import {
//   userinjson
// } from '../../../../../../test-fixtures/jsonbin/userinjson'

//NB: notice how just the username index is changed in many of these tests
//e.g. cleanedUpSRContractData[4].username

//swap this assignment out with copyconsoletemp to test actual data in the console
//const copyconsoletemp = copyconsoletemp;
//copyconsoletemp

beforeEach(cleanup)
//ensure descrbe blocks don't overlap
describe('Header UI', () => {
      //setup the user account info passed from app
      const testAccountPlayer1Rinkeby = '0x847700B781667abdD98E1393420754E503dca5b7';

      //for the functions that get sent in props
      function dummyFunction() {
        return null;
      }

      function setuserNameCB() {
        return null;
      }

      const props = {
        userAccounts: cleanedUpSRContractData,
        username: cleanedUpSRContractData[0].username,
        account: testAccountPlayer1Rinkeby,
        onAfterUserUpdate: (e) => dummyFunction(),
        rankingJSONdata: copyconsoletemp,
        balance: 4.0,
        setuserNameCB: (e) => setuserNameCB(),
        specificRankingOptionBtns: true
      }
      //do the tests
      it('RTL - check initial display', () => {
            const {
              getByText
            } = renderWithRouter( < Header {
                ...props
              }
              />);
              expect(getByText(/Home\/List All/i)).toHaveTextContent('Home\/List All');
              expect(getByText(/Update Profile/i)).toBeInTheDocument();
              expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
            });

          it('Profile link display', () => {
              renderWithRouter( < Header {
                  ...props
                }
                />);
                expect(document.querySelector('[data-testid="usernameinprofilelink"]')).toBeInTheDocument();
                expect(document.querySelector('[data-testid="balinprofilelink"]')).toBeInTheDocument();
              });

            it('Account dropdown display', () => {
                const {
                  getByTestId
                } = renderWithRouter( < Header {
                    ...props
                  }
                  />);
                  expect(document.querySelector('[data-testid="menuitem0"]')).toBeInTheDocument();
                  const dialogContainer = getByTestId("menuitem0")
                  const dialogContainer2 = getByTestId("menuitem1")
                  //the querySelector (span) has to be nested within the dialogContainer
                  expect(dialogContainer.querySelector('span').innerHTML).toBe('testuser1');
                  expect(dialogContainer2.querySelector('span').innerHTML).toBe('GanacheAcct2')
                });

              //NB: props need to be specific to these tests
              //there is no click event here so isCurrentUserActive: true has to be set
              it('specificRankingOptionBtns - true displays', () => {
                  const props = {
                    userAccounts: cleanedUpSRContractData,
                    username: cleanedUpSRContractData[0].username,
                    account: testAccountPlayer1Rinkeby,
                    specificRankingOptionBtns: true,
                    rankingJSONdata: specificranking
                    ,
                    isCurrentUserActive: true
                    // ,
                    // isUserInJson: true
                  }
                  const {
                    getByText
                  } = renderWithRouter( < Header {
                      ...props
                    }
                    />);
                    expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
                    expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i);
                    expect(getByText(/Update Profile/i)).toBeInTheDocument();
                    expect(getByText(/Home\/List All/i)).toBeInTheDocument()
                  });

                  it('specificRankingOptionBtns - true, player active false, display Re-Activate', () => {
                      const props = {
                        userAccounts: cleanedUpSRContractData,
                        username: cleanedUpSRContractData[0].username,
                        account: testAccountPlayer1Rinkeby,
                        specificRankingOptionBtns: true,
                        rankingJSONdata: copyconsoletemp
                      }
                      const {
                        getByText
                      } = renderWithRouter( < Header {
                          ...props
                        }
                        />);
                        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
                        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/Re-Activate?/i);
                        expect(getByText(/Update Profile/i)).toBeInTheDocument();
                        expect(getByText(/Home\/List All/i)).toBeInTheDocument()
                      });

                it('specificRankingOptionBtns - false does not display', () => {
                    const props = {
                      userAccounts: cleanedUpSRContractData,
                      username: cleanedUpSRContractData[0].username,
                      account: testAccountPlayer1Rinkeby,
                      specificRankingOptionBtns: false,
                      rankingJSONdata: copyconsoletemp
                      // ,
                      // isCurrentUserActive: true,
                      // isUserInJson: true
                    }
                    const {
                      getByText
                    } = renderWithRouter( < Header {
                        ...props
                      }
                      />);
                      expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument(); expect(getByText(/Update Profile/i)).toBeInTheDocument(); expect(getByText(/Home\/List All/i)).toBeInTheDocument()
                    });

                  it('RTL - isCurrentUserActive false - Display Re-Activate', () => {
                      const props = {
                        userAccounts: cleanedUpSRContractData,
                        username: cleanedUpSRContractData[0].username,
                        account: testAccountPlayer1Rinkeby,
                        specificRankingOptionBtns: true,
                        rankingJSONdata: copyconsoletemp
                        //,
                        // isCurrentUserActive: false,
                        // isUserInJson: true
                      }
                      renderWithRouter( < Header {
                          ...props
                        }
                        />);
                        expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
                        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/Re-Activate?/i);
                        expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: green;');
                      });

                    it('RTL - isCurrentUserActive true - Display De-Activate', () => {
                        const props = {
                          userAccounts: cleanedUpSRContractData,
                          username: cleanedUpSRContractData[2].username,
                          account: testAccountPlayer1Rinkeby,
                          specificRankingOptionBtns: true,
                          rankingJSONdata: specificranking
                          ,
                          isCurrentUserActive: true
                          // ,
                          // isUserInJson: true
                        }
                        renderWithRouter( < Header {
                            ...props
                          }
                          />);
                          expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
                          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i);
                          expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveAttribute("style", 'color: red;');
                        });

                      it('RTL - isCurrentUserActive true, isUserInJson: false', () => {
                          const props = {
                            userAccounts: cleanedUpSRContractData,
                            username: cleanedUpSRContractData[4].username,
                            account: testAccountPlayer1Rinkeby,
                            specificRankingOptionBtns: true,
                            rankingJSONdata: copyconsoletemp
                            // ,
                            // isCurrentUserActive: true,
                            // isUserInJson: false
                          }
                          renderWithRouter( < Header {
                              ...props
                            }
                            />);
                            expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
                          });

                        it('specificRankingOptionBtns - no-user in json - no display', () => {
                            const props = {
                              userAccounts: cleanedUpSRContractData,
                              username: cleanedUpSRContractData[4].username,
                              account: testAccountPlayer1Rinkeby,
                              specificRankingOptionBtns: true,
                              rankingJSONdata: copyconsoletemp
                              // ,
                              // isCurrentUserActive: JSONops._getUserValue(copyconsoletemp, cleanedUpSRContractData[0].username, "ACTIVE"),
                              // isUserInJson: JSONops.isPlayerListedInJSON(copyconsoletemp, cleanedUpSRContractData[0].username)

                            }
                            const {
                              getByText
                            } = renderWithRouter( < Header {
                                ...props
                              }
                              />);
                              expect(document.querySelector('[data-testid="activatebtn-input"]')).not.toBeInTheDocument();
                              //expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i)
                              expect(getByText(/Update Profile/i)).toBeInTheDocument();
                              expect(getByText(/Home\/List All/i)).toBeInTheDocument()
                            });

                          it('specificRankingOptionBtns - user in json - display', () => {
                              const uname = 'GanacheAcct3';
                              const props = {
                                userAccounts: cleanedUpSRContractData,
                                username: uname,
                                account: testAccountPlayer1Rinkeby,
                                specificRankingOptionBtns: true,
                                rankingJSONdata: specificranking
                                ,
                                //isCurrentUserActive: JSONops._getUserValue(copyconsoletemp, uname, "ACTIVE")
                                isCurrentUserActive: true
                                //,
                                // isUserInJson: JSONops.isPlayerListedInJSON(copyconsoletemp, uname)

                              }
                              const {
                                getByText
                              } = renderWithRouter( < Header {
                                  ...props
                                }
                                />);
                                expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
                                expect(document.querySelector('[data-testid="activatebtn-input"]')).toHaveTextContent(/De-Activate?/i);
                                expect(getByText(/Update Profile/i)).toBeInTheDocument();
                                expect(getByText(/Home\/List All/i)).toBeInTheDocument()
                              });
                          });
