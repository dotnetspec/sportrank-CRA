import web3 from '../../../../../web3';
import { getWeb3Accounts } from './web3Accounts';
//this may appear unnecessary but it's done to
//enable mocking:
      export async function sendEthTransaction(gasEstimate){
        console.log('sendEthTransaction')
        //If you are sending transactions back-to-back from the same account,
        //you need to manually set the nonce, because the node will not keep track of it correctly.
        const account = await getWeb3Accounts();
        let nonce = await web3.eth.getTransactionCount(account);
        nonce = nonce++;
        console.log('nonce', nonce);
        return await web3.eth.sendTransaction({ from: account, to: '0xAC5491BB066c98fec13046928a78761c0B1E5603', nonce: nonce, value: 1**17, gas: gasEstimate + 1000 });
    }
