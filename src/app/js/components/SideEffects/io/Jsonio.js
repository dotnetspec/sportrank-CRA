import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';



export async function _loadsetJSONData (newrankIdCB, _loadsetJSONData_callback){
      try {
            let httpStr = 'https://api.jsonbin.io/b/' + newrankIdCB + '/latest';
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
          await fetch(httpStr)
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
export async function getNewRankId(getNewRankId_callback, description, account, email, contactno, user) {
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
      console.log('getNewRankId using myJSON', myJSON)

      req.open("POST", "https://api.jsonbin.io/b", true);
      //req.open("PUT", "https://api.jsonbin.io/b", true);
      req.setRequestHeader("Content-type", "application/json");
      //req.send('{"Player": "Johan Straus"}') || {}
      req.send(myJSON)
      //|| {}
      }catch (err) {
      // stop loading state and show the error
      console.log(err)
      //this.setState({ isLoading: false, error: err.message });
    };
      return null;
  }

//NB: this function cannot actually be used in app.js as it's only simulating the one
//nested inside the mapping function of _loadCurrentUserAccounts
//   export async function _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback){
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
