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
