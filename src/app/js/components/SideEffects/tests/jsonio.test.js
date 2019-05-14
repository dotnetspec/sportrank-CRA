import { _loadsetJSONData, _loadsetRankingListJSONData, getNewRankId } from '../io/Jsonio';

// beforeEach(() => {
//     jest.setTimeout(1000);
//   });

test.skip('_loadsetJSONData data is ranking data', done => {
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

 test.skip('_loadsetRankingListJSONData data is list of ranking lists data', done => {
   const rankingDefaultid = '5c36f5422c87fa27306acb52';

   function _loadsetRankingListJSONData_callback(data) {
     console.log('data', data[0].RANKINGNAME);
      expect(data[0].RANKINGNAME).toMatch("testRank1");
      //done() is the cb(?) function in the declaration (above)
      done();
    }
    _loadsetRankingListJSONData(rankingDefaultid, _loadsetRankingListJSONData_callback);
  });

  test.skip('getNewRankId', done => {
    //const rankingDefaultid = '5c36f5422c87fa27306acb52';

    function getNewRankId_callback(data) {
      console.log('data', data);
      let secretKeymsg = data;
      secretKeymsg = JSON.stringify(secretKeymsg);
       expect(secretKeymsg).toMatch("{\"message\":\"You need to pass a secret-key in the header to Create a Bin\",\"success\":false}");
       //expect(data.id).toMatch('5c36f5422c87fa27306acb52');
       //done() is the cb(?) function in the declaration (above)
       done();
     }
     getNewRankId(getNewRankId_callback, "test description", '123456', 'test@test.com', '67890', 'player1');
   });

   //NB: this test is just simulating the
   //anon async function within the mapping of _loadCurrentUserAccounts
   //for illustration purposes
   // test('_loadCurrentUserAccountsInsideMapping test', done => {
   //   //const rankingDefaultid = '5c36f5422c87fa27306acb52';
   //   //const address = ['0x847700B781667abdD98E1393420754E503dca5b7', '0x999900B781667abdD98E1393420754E503dca999'];
   //   const address = "0x847700B781667abdD98E1393420754E503dca5b7";
   //   function _loadCurrentUserAccountsInsideMapping_callback(obj) {
   //     console.log('data', obj);
   //     // const addr = "0x847700B781667abdD98E1393420754E503dca5b7";
   //     // const name = "player1";
   //     // let secretKeymsg = data;
   //     //obj = JSON.stringify(obj);
   //
   //      expect(obj.address).toEqual("0x847700B781667abdD98E1393420754E503dca5b7");
   //      expect(obj.balance).toEqual(2);
   //      expect(obj.user.username).toEqual("player1");
   //      //expect(data.id).toMatch('5c36f5422c87fa27306acb52');
   //      //done() is the cb(?) function in the declaration (above)
   //      done();
   //    }
   //    _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback);
   //  });

 // afterEach(async () => {
 //     await _loadsetJSONData().end();
 // });
