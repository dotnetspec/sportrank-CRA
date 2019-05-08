import { _loadsetJSONData, _loadsetRankingListJSONData } from '../io/Jsonio';

beforeEach(() => {
    jest.setTimeout(6000);
  });

//  test.skip('the data is peanut butter', async () => {
//
//    expect.assertions(1);
//   const data = await _loadsetJSONData('5c36f5422c87fa27306acb52');
//
//   // const data = async () => {
//   //         try {
//   //           const result = await _loadsetJSONData('5c36f5422c87fa27306acb52');
//   //           console.log("REQUEST FULLFILLED: ", result);
//   //         } catch(err){
//   //           console.log("REQUEST FAILED: ");
//   //         }
//   //       };
//   //
//   //       (async function() {
//   //     await sendMessageRequest();
//   //   })();
//
//
//   }
// );

test.skip('the data is json', async () => {
  //expect.assertions(1);
  //this passes:
  const rankid = '5bd82af2baccb064c0bdc92a';
  //let httpStr = 'https://api.jsonbin.io/b/' + rankid + '/latest';
  //await expect(fetch(httpStr)).resolves.toMatchSnapshot();
  //await expect(_loadsetJSONData(rankid)).resolves.toMatchSnapshot();

  //await expect(_loadsetJSONData(rankid)).resolves.toMatch("finished _loadsetJSONData");
  //this fails
  //await expect(_loadsetJSONData(rankid)).resolves.toMatch(/"RANKINGNAME":"testRank1"/);
  //done();

  //const data = await fetch(httpStr);
  //const parsedData = JSON.parse(data);
  //await expect(fetch(httpStr)).resolves.toMatch(/"RANKINGNAME":"testRank1"/);

  //await expect(_loadsetJSONData(rankid)).resolves.toMatchSnapshot();

  //expect.assertions(1);


  //expect(parsedData).toMatch(/"RANKINGNAME":"testRank1"/);
});

test('_loadsetJSONData data is ranking data', done => {
  const rankid = '5bd82af2baccb064c0bdc92a';
  //let httpStr = 'https://api.jsonbin.io/b/' + rankid + '/latest';
  //await expect(fetch(httpStr)).resolves.toMatchSnapshot();
  //await expect(_loadsetJSONData(rankid)).resolves.toMatchSnapshot();

  //await expect(data).toMatch(/"RANKINGNAME":"testRank1"/);
  //await _loadsetJSONData();
   //expect(_loadsetJSONData(rankid)).resolves.toMatch("finished _loadsetJSONData");
  //this fails
  //await expect(_loadsetJSONData(rankid)).resolves.toMatch(/"RANKINGNAME":"testRank1"/);
  function callback(data) {
    //data =
    //const datanew = data;
    console.log('data', data[0].ACCOUNT);
     expect(data[0].ACCOUNT).toMatch("0xe39b0Db1DeAE67c303A2C2eC8894A4c36175B11");
     done();
   }

   _loadsetJSONData(rankid, callback);
 });

 test('_loadsetRankingListJSONData data is list of ranking lists data', done => {
   const rankingDefaultid = '5c36f5422c87fa27306acb52';

   function callback(data) {
     console.log('data', data[0].RANKINGNAME);
      expect(data[0].RANKINGNAME).toMatch("testRank1");
      //done() is the cb(?) function in the declaration (above)
      done();
    }
    _loadsetRankingListJSONData(rankingDefaultid, callback);
  });

 test.skip('get json', async (done) => {
     //jest.setTimeout(90000);
     const data = await _loadsetJSONData();
     await expect(data).toMatch(/"RANKINGNAME":"testRank1"/);
     //expect(data).toMatch(/"RANKINGNAME":"testRank1"/);
     done();
 });

 // afterEach(async () => {
 //     await _loadsetJSONData().end();
 // });



// test.skip('the fetch fails with an error', async () => {
//   expect.assertions(1);
//   try {
//     //await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });
