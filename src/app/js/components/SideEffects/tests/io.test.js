import { _loadsetJSONData, _loadsetRankingListJSONData } from '../io/Jsonio';

// beforeEach(() => {
//     jest.setTimeout(1000);
//   });

test('_loadsetJSONData data is ranking data', done => {
  const rankid = '5bd82af2baccb064c0bdc92a';
  //let httpStr = 'https://api.jsonbin.io/b/' + rankid + '/latest';
  //await expect(fetch(httpStr)).resolves.toMatchSnapshot();
  //await expect(__loadsetJSONData(rankid, _loadsetJSONData_callback)).resolves.toMatchSnapshot();
  function _loadsetJSONData_callback(data) {
    console.log('data', data[0].ACCOUNT);
     expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
     //toMatchSnapshot causes timeout error
     //expect(data[0].ACCOUNT).resolves.toMatchSnapshot();
     done();
   }
   _loadsetJSONData(rankid, _loadsetJSONData_callback);
 });

 test('_loadsetRankingListJSONData data is list of ranking lists data', done => {
   const rankingDefaultid = '5c36f5422c87fa27306acb52';

   function _loadsetRankingListJSONData_callback(data) {
     console.log('data', data[0].RANKINGNAME);
      expect(data[0].RANKINGNAME).toMatch("testRank1");
      //done() is the cb(?) function in the declaration (above)
      done();
    }
    _loadsetRankingListJSONData(rankingDefaultid, _loadsetRankingListJSONData_callback);
  });

 // afterEach(async () => {
 //     await _loadsetJSONData().end();
 // });
