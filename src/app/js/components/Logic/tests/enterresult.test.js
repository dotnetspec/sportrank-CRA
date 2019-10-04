import React from "react";
import {shallow, mount} from "enzyme";
import EnterResult from "../EnterResult";
import {wait} from "@testing-library/dom";
import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import JSONops from "../JSONops";
//import {Jsonio, _sendJSONDataWithRankingID} from "../../SideEffects/io/Jsonio";
import {
  render,
  cleanup,
  fireEvent,
  getByText,
  container,
  waitForElement,
  getByLabelText
} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import App from "../App";
import fetchData from "../App";
import _loadExternalBalance from "../App";
import mapTheAccounts from "../App";
//import _loadExternalBalance from "../App";
import getDefaultRankingList from "../App";
import renderer from "react-test-renderer";
import waitForExpect from "wait-for-expect";
// import {
//   stub
// } from 'sinon';
import {renderWithRouter} from "../../../utils";
//import 'jest-dom/extend-expect'
//since this is a test it's not actually importing the real 'axios' but
//rather the axios in the __mocks__ folder
import axiosMock from "../../SideEffects/tests/__mocks__/axios";
import web3ioMock from "../../SideEffects/tests/__mocks__/web3io";
import {
  _loadsetJSONData,
  _loadsetRankingListJSONData,
  getNewRankId,
  asyncFetch
} from "../../SideEffects/io/Jsonio";
import {fetchMock} from "fetch-mock";
import _loadCurrentUserAccounts from "../../SideEffects/io/web3io";
import {specificRankingData} from "../../../../../../test-fixtures/jsonbin/specificRankingData";
import {globalRankings} from "../../../../../../test-fixtures/jsonbin/globalRankings";
import {cleanedUpSRContractData} from "../../../../../../test-fixtures/jsonbin/cleanedUpSRContractData";

afterEach(cleanup);

jest.mock("../../SideEffects/io/Jsonio");
//not sure if below doing anything ...
//jest.mock("../../SideEffects/io/web3io");
jest.mock("../App");

//jest.useFakeTimers();

describe("Enter Result", () => {
  //default values, override in tests if necessary
  const testAccountPlayer1Rinkeby =
    "0x847700B781667abdD98E1393420754E503dca5b7";
  const globalRankingData = [
    {
      RANKINGNAME: "mplayer1rank",
      RANKINGDESC: "mp1r",
      ACTIVE: true,
      RANKINGID: "5c875c79adeb832d3ec6732d"
    }
  ];
  const url = "/";
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

  const userAccountsArray = [
    {
      address: "0x847700B781667abdD98E1393420754E503dca5b7",
      balance: 2.0,
      user: {
        username: "player1",
        description: "test2",
        email: "test@test.com",
        owner: "0x847700B781667abdD98E1393420754E503dca5b7",
        picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
        rankingDefault: "5c81c1e944e81057efe3e2c8"
      }
    }
  ];

  const userObj = {
    username: "player1",
    description: "test2",
    email: "test@test.com",
    owner: testAccountPlayer1Rinkeby,
    picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
    rankingDefault: "5c81c1e944e81057efe3e2c8"
  };

  const props = {
    userAccounts: cleanedUpSRContractData,
    rankingListJSONdata: globalRankings,
    account: testAccountPlayer1Rinkeby,
    user: cleanedUpSRContractData[0]
  };

  xit("Basic load ", async () => {
    // jest.spyOn(EnterResult.prototype, "componentDidMount");
    // shallow(<EnterResult />);
    // expect(EnterResult.prototype.componentDidMount).toHaveBeenCalled();
    // EnterResult.prototype.componentDidMount.mockRestore();
    //const cleanedUpSRContractDatanow = JSON.stringify(cleanedUpSRContractData);
    // console.log(
    //   "typeof cleanedUpSRContractDatanow",
    //   typeof cleanedUpSRContractDatanow,
    //   cleanedUpSRContractDatanow
    // );

    //fetchData.mockResolvedValueOnce(cleanedUpSRContractData);
    mapTheAccounts.mockResolvedValueOnce(cleanedUpSRContractData);
    _loadExternalBalance.mockResolvedValueOnce(2.0);
    getDefaultRankingList.mockResolvedValueOnce(globalRankings);

    const {
      debug,
      getByTestId,
      getByText,
      waitForDomChange,
      waitForElement
    } = await renderWithRouter(<App />);

    debug();

    const mplayer1 = await waitForElement(() => getByText("mplayer1rank"));
    expect(getByText("mplayer1rank")).toBeInTheDocument();
    expect(mplayer1).toHaveTextContent("mplayer1rank");
    // await wait(() => getByText("mplayer1rank"));
    // expect(getByText("mplayer1rank")).toBeInTheDocument();
  });

  xit("Load specificranking with an ongoing challenge", async () => {
    const props = {
      userAccounts: cleanedUpSRContractData,
      username: cleanedUpSRContractData[0].username,
      account: testAccountPlayer1Rinkeby,
      specificRankingOptionBtns: true,
      setspecificRankingOptionBtnsCB: e => dummyFunction(),
      setnewrankIdCB: e => dummyFunction(),
      setviewingOnlyCB: e => dummyFunction(),
      isCurrentUserActive: true,
      isUserInJson: true,
      rankingJSONdata: specificRankingData,
      //rankingListData: globalRankings,
      rankingListJSONdata: globalRankings,
      history: historyMock
    };

    //const fakeUserResponse = {token: 'fake_user_token'}
    const fakeUserDataResponse = cleanedUpSRContractData[0];
    const fakeGlobalRankingDataResponse = globalRankings[0];
    const fakeExternalBalResponse = 2.0;
    jest.spyOn(window, "fetchData").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeUserDataResponse)
      });
    });

    jest.spyOn(window, "getDefaultRankingList").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeGlobalRankingDataResponse)
      });
    });

    jest.spyOn(window, "_loadExternalBalance").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeExternalBalResponse)
      });
    });

    const {debug, getByTestId, getByText, waitForDomChange} = renderWithRouter(
      <App {...props} url={url} />
    );

    //console.log('globalRankings', props.rankingListJSONdata)
    //expect(document.querySelector('[data-testid="activatebtn-input"]')).toBeInTheDocument();
    //await wait(() => getByTestId("menuitem3")); fireEvent.click(getByTestId("menuitem3"));
    //await wait(() => getByText("View"));
    //expect(getByText("mplayer1rank")).toBeInTheDocument();
    //jest.runAllTimers();
    //jest.advanceTimersByTime(1000);
    await wait(() => getByText("mplayer1rank"));
    expect(getByText("mplayer1rank")).toBeInTheDocument();
    //await wait(() => expect(getByText("mplayer1rank")).toBeInTheDocument());
    //await wait(() =>
    //expect(getByText("mplayer1rank")).toBeInTheDocument();
    // joinbtn.fireEvent.click();
    //await wait(() => fireEvent.click(getByText(/View/i)));
    debug();
    // //await wait(() => expect(getByText(/Create An Account Name/i)).toBeInTheDocument());
    // //expect(getByText(/Create An Account Name/i)).toBeInTheDocument();
    // await wait(() => expect(getByTestId('activatebtn-input')).toBeInTheDocument());
  });
});

xit("EnterResult - invokes `componentDidMount` when shallow mounted", () => {
  jest.spyOn(EnterResult.prototype, "componentDidMount");
  shallow(<EnterResult />);
  expect(EnterResult.prototype.componentDidMount).toHaveBeenCalled();
  EnterResult.prototype.componentDidMount.mockRestore();
});

xit("EnterResult - not invoke `_getValidationState` when shallow mounted", () => {
  jest.spyOn(EnterResult.prototype, "_getValidationState");
  shallow(<EnterResult />);
  expect(EnterResult.prototype._getValidationState).not.toHaveBeenCalled();
  EnterResult.prototype._getValidationState.mockRestore();
});

xit("EnterResult - not invoke `setResult` when shallow mounted", () => {
  jest.spyOn(EnterResult.prototype, "setResult");
  shallow(<EnterResult />);
  expect(EnterResult.prototype.setResult).not.toHaveBeenCalled();
  EnterResult.prototype.setResult.mockRestore();
});

xit("EnterResult - not invoke `_handleClick` when shallow mounted", () => {
  const mockedhandleclickFunction = jest.fn(event => {
    console.log("Mocked function");
  });
  jest.spyOn(EnterResult.prototype, "_handleClick");
  //const component = shallow(<EnterResult onClick={mockedhandleclickFunction}/>);
  //component.find(EnterResult).instance().onClick = mockedhandleclickFunction;
  //expect(wrapper.find(SignUpForm).state('errors')).to.equal({});
  expect(EnterResult.prototype._handleClick).not.toHaveBeenCalled();
  EnterResult.prototype._handleClick.mockRestore();
});
