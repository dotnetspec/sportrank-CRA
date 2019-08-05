import axios from 'axios';
//TODO: all functions using _sendJSONData will need to be updated to use this
//one that includes the rankingID
  //_sendJSONDataWithRankingID: function(data, rankingID){
  // export function Jsonio({
  //   props
  // }) {
    export async function _sendJSONDataWithRankingID (data, rankingID) {
    console.log('rankingID inside _sendJSONDataWithRankingID',rankingID)
    console.log('data inside _sendJSONDataWithRankingID',data)
    //console.log('inside _sendJSONDataWithRankingID')
    let httpString = "https://api.jsonbin.io/b/";
    //httpString += rankingID + '"';
    httpString += rankingID;
    let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
          if (req.readyState === XMLHttpRequest.DONE) {
            console.log('httpString in req.onreadystatechange', httpString);
            //NB. when checking on jsonbin.io e.g. https://jsonbin.io/5c340b667b31f426f8531274/1
            //ensure you include the version number to see that the array has been 'PUT'
            console.log('req.responseText in _sendJSONDataWithRankingID', req.responseText);
            //console.log(req.responseText);
            return req.responseText;
          }
        };
        //NOTE: it is the api.jsonbin NOT the jsonbin.io!
        //JSON data can and should be in ANY order
        //bin id is: https://jsonbin.io/5bd82af2baccb064c0bdc92a/
        //use above to edit manually.
        //to view latest https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/latest

        req.open("PUT", httpString, true);
        req.setRequestHeader("Content-type", "application/json");
        let myJsonString = JSON.stringify(data);
        console.log('httpString, data in _sendJSONDataWithRankingID', httpString, data);

        //console.log('data.id alone in _sendJSONDataWithRankingID', data.id)
        //I think data.id will only be defined IF this is a new ranking
        //if this is a new ranking send an array, not just an object
        //if this is a new ranking id will be 1
        //HACK: there may be a better way to test that this is a new ranking and user
        //the first entry to jsonbin must have array brackets so that responseJson can be
        //correctly displayed in BootstrapTable
        if(data.id === 1){
        const myJsonStringAsArray = "[" + myJsonString + "]";
          req.send(myJsonStringAsArray);
        }else{
          req.send(myJsonString);
        }
        //return null;
}


//Reference:
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//REVIEW: Possibly implement requestConfig later ...

const requestConfig = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
        // ,
        // body: JSON.stringify({
        //   'test',
        //   'test'
        // })
      };


 export async function getDefaultRankingList (rankingDefault, getDefaultRankingList_callback) {
      //export const getDefaultRankingList = async (rankingDefault, getDefaultRankingList_callback) => {
        try {
          let httpStr = 'https://api.jsonbin.io/b/' + rankingDefault + '/latest';
          axios.get(httpStr)
          .then(res => {
            const json = res.data;
            //console.log('json', json)
            getDefaultRankingList_callback(json)
            //return checkUndefined(json);
            //return json;
            //setrankingListData(json);
          })
        } catch (e) {
          //setState({ error: e });
          //setError(e);
          return e;
        } finally {

        }
      }

//asyncFetch abstracted to enable mocking
 export async function asyncFetch(url) {
  return await fetch(url);
}

 export async function _loadsetJSONData (newrankId, _loadsetJSONData_callback){
  console.log('newrankId IN _loadsetJSONData', newrankId);
      try {
            let httpStr = 'https://api.jsonbin.io/b/' + newrankId + '/latest';

            await fetch(httpStr)
               .then((response) => response.json())
               .then((responseJson) => {
                 if(responseJson.length !== 0){
                   responseJson = checkUndefined(responseJson);
                   _loadsetJSONData_callback(responseJson);
                     }
               })
            }catch (err) {
               return console.error(err);
            }
}

 export async function _loadsetRankingListJSONData (rankingDefault, _loadsetRankingListJSONData_callback){
//REVIEW: following is attempt to refactor fetchjson
//await fetchJSON(rankingDefault, _loadsetRankingListJSONData_callback);
  try {
          let httpStr = 'https://api.jsonbin.io/b/' + rankingDefault + '/latest';
          await fetch(httpStr, requestConfig)
           .then((response) => response.json())
           .then((responseJson) => {
             if(responseJson.length !== 0){
               responseJson = checkUndefined(responseJson);
               _loadsetRankingListJSONData_callback(responseJson);
              }
           })
        }catch (err) {
             return console.error(err);
          }
}

//get a new rankid ready in case user wants/needs to create a new ranking
//do this after _loadsetJSONData so that we will already have the correct username
//getNewRankId = async () => {
 export async function getNewRankId(description, account, email, contactno, user, getNewRankId_callback) {
  //console.log('userNameCB in getNewRankId in app', this.state.userNameCB)
    try{
    //this.setState({ isLoading: true});
    let req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        //this async section tests whether the result
        //from the code lower down has been returned
        //(without using await)
        if (req.readyState === XMLHttpRequest.DONE) {

          const resulttxt = JSON.parse(req.responseText);
          getNewRankId_callback(resulttxt);
          //only here can set state (once result is back)
          //this.setState({ newrankId: resulttxt.id});
          //this.setState({ ranknameHasChanged: true});
          //this.setState({ isLoading: false});
        }
      };
      //NB: following will send the request but
      //need to wait for the results to come back
      //(above) before any further processing can be
      //done
      var obj = {
      DATESTAMP: Date.now(),
      ACTIVE: true,
      DESCRIPTION: description,
      CURRENTCHALLENGERNAME: "AVAILABLE",
      CURRENTCHALLENGERID: 0,
      ACCOUNT: account,
      EMAIL: email,
      CONTACTNO: contactno,
      RANK: 1,
      NAME: user,
      id: 1 };

      let myJSON = JSON.stringify(obj);
      //console.log('getNewRankId using myJSON', myJSON)

      req.open("POST", "https://api.jsonbin.io/b", true);
      //req.open("PUT", "https://api.jsonbin.io/b", true);
      req.setRequestHeader("Content-type", "application/json");
      //req.send('{"Player": "Johan Straus"}') || {}
      req.send(myJSON)
      //|| {}
      }catch (err) {
      // stop loading state and show the error
      //console.log(err)
      //this.setState({ isLoading: false, error: err.message });
    };
      return null;
  }

//NB: this function cannot actually be used in app.js as it's only simulating the one
//nested inside the mapping function of _loadCurrentUserAccounts
//    async function _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback){
//     // var MyContract = web3.eth.contract(ABI);
//     // var contractInstance = MyContract.at(address);
//     //const contractInstance = new DSportRank();
//     // window.addEventListener('load', function() {
//     //   const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {});
//     // })
//     //console.log('web3.currentProvider', web3.currentProvider);
//     const usernameHash = await DSportRank.methods.owners(address).call();
//
//     // const myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//     // defaultAccount: '0x1234567890123456789012345678901234567891', // default from address
//     // defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// //});
//     // if(!DSportRank.isConnected()) {
//     //
//     //     console.log('not connected to web3!')
//     //
//     // } else {
//       //const usernameHash = await DSportRank.methods.owners(address).call();
//           // console.log('got usernameHash after await', usernameHash)
//           // console.log('exec at', executingAt());
//           // get user details from contract
//       const user = await DSportRank.methods.users(usernameHash).call();
//       //const user = "player1";
//       const balance = 2;
//       // gets the balance of the address
//       // let balance = await web3.eth.getBalance(address);
//       // balance = web3.utils.fromWei(balance, 'ether');
//       // console.log('balance', balance);
//       const contractObj = {address: address, user: user, balance: balance};
//       _loadCurrentUserAccountsInsideMapping_callback(contractObj);
//     }



  //}
//REVIEW: following is attempt to refactor fetchjson
// async function fetchJSON(JSONid, callback){
//   try {
//           let httpStr = 'https://api.jsonbin.io/b/' + JSONid + '/latest';
//           await fetch(httpStr)
//            .then((response) => response.json())
//            .then((responseJson) => {
//              if(responseJson.length !== 0){
//                 responseJson = checkUndefined(responseJson);
//                 callback(responseJson);
//               // _loadsetRankingListJSONData_callback(responseJson);
//               }
//            })
//         }catch (err) {
//              return console.error(err);
//           }
// }
          //private function not for export 
          function checkUndefined(responseJson){
              let responseDataAsArray = [];
            if(responseJson.length === undefined){
              //on creation of a new user the [] isn't recognized
              //turn the object into an array for use by BSTable
              //responseJson = "[" + responseJson + "]";
              responseDataAsArray[0] = responseJson;
              responseJson = responseDataAsArray;
              return responseJson;
            } else {
              return responseJson;
            }
          }
//}
