export async function _loadsetJSONData (newrankIdCB, callback){
      try {
        //let httpStr = 'https://api.jsonbin.io/b/5bd82af2baccb064c0bdc92a/latest';
      //let newrankIdCB = '5bd82af2baccb064c0bdc92a;'
      let httpStr = 'https://api.jsonbin.io/b/' + newrankIdCB + '/latest';
      let responseDataAsArray = [];
      console.log('httpStr', httpStr)
      await fetch(httpStr)
         .then((response) => response.json())
         .then((responseJson) => {
           callback(responseJson);

           if(responseJson.length !== 0){
             console.log('json returns with length ' + responseJson.length + 'in _loadsetJSONData in app.js')
             console.log('responseJson data', responseJson)
             //HACK: it appears this code is not being used but commit
             // made as new rankings are being created for new users without error
             //on creation of a new user the [] isn't recognized
             //although the new json object comes back BootstrapTable cannot handle it.
             //So convert here:
                 if(responseJson.length === undefined){
                   //turn the object into an array for use by BSTable
                   //responseJson = "[" + responseJson + "]";
                   responseDataAsArray[0] = responseJson;
                   responseJson = responseDataAsArray;
                   console.log('responseJson converted to array', responseJson)
                 }

                 return responseJson;
               }
         })
      //REVIEW:this.setState({ isLoading: false });the 'return' is not important, the setState is
        return 'finished _loadsetJSONData';
        //return null;
        //return responseJson;
        }catch (err) {
           return console.error(err);
        }//end try/catch
}
