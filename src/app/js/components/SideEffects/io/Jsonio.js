import axios from 'axios';
//TODO: all functions using _sendJSONData will need to be updated to use this
//one that includes the rankingID
  //_sendJSONDataWithRankingID: function(data, rankingID){
  // export function Jsonio({
  //   props
  // }) {

  //POST a new ranking list update
    //export async function _sendJSONDataWithRankingID (data, rankingID) {
    export const _sendJSONDataWithRankingID = (data, rankingID) => {
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
            //ensure you include the version number (at the end of string above)
            //to see that the array has been 'PUT'
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
        //leave this as PUT cos it's just for updating bin in collection
        req.open("PUT", httpString, true);
        req.setRequestHeader("Content-type", "application/json");
        req.setRequestHeader("secret-key", "$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i");
        req.setRequestHeader("collection-id", "5d7deab3371673119fab12a6");
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


 export async function getDefaultRankingList (rankingDefault, getDefaultRankingList_callback) {
      //export const getDefaultRankingList = async (rankingDefault, getDefaultRankingList_callback) => {
        try {
          let httpStr = 'https://api.jsonbin.io/b/' + rankingDefault + '/latest';
          var requestConfig = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i',
                'collection-id': '5d7deab3371673119fab12a6'
              }
            }
          axios.get(httpStr, requestConfig)
          .then(res => {
            const json = res.data;
            console.log('json', json)
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

//GET the specific ranking list
 export async function _loadsetJSONData (newrankId, _loadsetJSONData_callback){
  console.log('newrankId IN _loadsetJSONData', newrankId);
      try {
            let httpStr = 'https://api.jsonbin.io/b/' + newrankId + '/latest';
            var requestConfig = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'secret-key': '$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i',
                  'collection-id': '5d7deab3371673119fab12a6'
                }
              }
            await fetch(httpStr, requestConfig)
               .then((response) => response.json())
               .then((responseJson) => {
                 if(responseJson.length !== 0){
                   responseJson = checkUndefined(responseJson);
                     console.log('responseJson IN _loadsetJSONData', responseJson);
                   _loadsetJSONData_callback(responseJson);
                     }
               })
            }catch (err) {
               return console.error(err);
            }
}

//  export async function _loadsetRankingListJSONData (rankingDefault, _loadsetRankingListJSONData_callback){
// //REVIEW: following is attempt to refactor fetchjson
// //await fetchJSON(rankingDefault, _loadsetRankingListJSONData_callback);
//   try {
//           let httpStr = 'https://api.jsonbin.io/b/' + rankingDefault + '/latest';
//           var requestConfig = {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'secret-key': '$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i',
//                 'collection-id': '5d7deb68371673119fab12d7'
//               }
//             }
//           await fetch(httpStr, requestConfig)
//            .then((response) => response.json())
//            .then((responseJson) => {
//              if(responseJson.length !== 0){
//                responseJson = checkUndefined(responseJson);
//                console.log('responseJson IN _loadsetRankingListJSONData', responseJson);
//                _loadsetRankingListJSONData_callback(responseJson);
//               }
//            })
//         }catch (err) {
//              return console.error(err);
//           }
// }



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
          return resulttxt;
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
      CURRENTCHALLENGERADDRESS: "",
      CURRENTCHALLENGERID: 0,
      ADDRESS: account,
      EMAIL: email,
      CONTACTNO: contactno,
      RANK: 1,
      NAME: user,
      id: 1 };

      let myJSON = JSON.stringify(obj);

      req.open("POST", "https://api.jsonbin.io/b", true);
      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("secret-key", "$2a$10$HIPT9LxAWxYFTW.aaMUoEeIo2N903ebCEbVqB3/HEOwiBsxY3fk2i");
      req.setRequestHeader("collection-id", "5d7deab3371673119fab12a6");
      req.send(myJSON)
      }catch (err) {
        console.log(err)
    };
      return null;
  }
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
