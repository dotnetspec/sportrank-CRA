import web3 from '../../../../../web3';
import { getWeb3Accounts } from './web3Accounts';
//abstracting this may appear unnecessary but it's done to
//enable mocking:
      export async function sendEthTransaction(gasEstimate){
        console.log('sendEthTransaction')
        //rinkeby test account: 0x847700B781667abdD98E1393420754E503dca5b7
        //If you are sending transactions back-to-back from the same account,
        //you need to manually set the nonce,
        //because the node will not keep track of it correctly.
        const account = await getWeb3Accounts();
        let nonce = await web3.eth.getTransactionCount(account);
        nonce = nonce++;
        //only return when promise has returned
        web3.eth.sendTransaction({
          from: account, to: '0xAC5491BB066c98fec13046928a78761c0B1E5603', nonce: nonce, value: 1**17, gas: gasEstimate + 1000
        })
        // .on('result', function(result){
        //     console.log('result', result);
        //     return result;
        // })
        .on('transactionHash', function(hash){
            console.log('hash', hash);
        })
        .on('receipt', function(receipt){
            console.log('receipt', receipt);
            //return receipt;
        })
        .on('confirmation', function(confirmationNumber, receipt){
          //console.log('confirmationNumber', confirmationNumber);
        })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    }
