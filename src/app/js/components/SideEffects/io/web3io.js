import web3 from '../../../../../web3';
import DSportRank from '../../../../../ABIaddress';
import { formatEth, executingAt } from '../../../utils';

//NB: this function cannot actually be used in app.js as it's only simulating the one
//nested inside the mapping function of _loadCurrentUserAccounts
//helped to understand how the mapping works
  export async function _loadCurrentUserAccountsInsideMapping(address, _loadCurrentUserAccountsInsideMapping_callback){

      const usernameHash = await DSportRank.methods.owners(address).call();
          // get user details from contract
      const user = await DSportRank.methods.users(usernameHash).call();
      // gets the balance of the address
      let balance = await web3.eth.getBalance(address);
      balance = web3.utils.fromWei(balance, 'ether');
      const contractObj = {address: address, user: user, balance: balance};
      _loadCurrentUserAccountsInsideMapping_callback(contractObj);
    }

    //REVIEW: below based on
    //https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
    //to a (small) degree - anyway it's a useful reference
        export async function _loadExternalBalance(_loadExternalBalance_callback){
        try {
          let devAccountBalResult = await web3.eth.getBalance("0xd496e890fcaa0b8453abb17c061003acb3bcc28e");
          devAccountBalResult = web3.utils.fromWei(devAccountBalResult, 'ether');
          devAccountBalResult =  formatEth(devAccountBalResult, 3);
          _loadExternalBalance_callback(devAccountBalResult);
        }catch (err) {
          return err;
          }
      }

// export async function isWeb3Connected(){
//   console.log('here')
//     web3.eth.net.isListening()
//       .then(() => console.log('is connected'))
//       .catch(e => console.log('Wow. Something went wrong'));
//       return 'in here'
//     }

export async function connectToWeb3new(connectToWeb3_callback){
    console.log('connectToWeb3new')
  let ethereumObj = {};
    if (typeof web3.ethereum !== 'undefined') {
      console.log('you have an etherem compatible browser')
      if(web3.ethereum.isMetaMask){
        console.log('you have MM in the browser')
        ethereumObj = {networkVersion:  window.ethereum.networkVersion,   // property_# may be an identifier...
                            selectedAddress:  window.ethereum.selectedAddress}
        // console.log('ethereum.networkVersion',  )
        // console.log('ethereum.selectedAddress', )
        connectToWeb3_callback(ethereumObj);
        //window.ethereum.enable();
        }
    };
  }


export async function connectToWeb3(){
    window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        //window.web3 = new Web3(ethereum);
        window.web3 = web3;
        try {
            // Request account access if needed
            await web3.enable();
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
            return web3;
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = web3;
        //new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
        return web3;
    }
    // Non-dapp browsers...
    else {
        return 'Non-Ethereum browser detected. You should consider trying MetaMask!';
        //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});
}
