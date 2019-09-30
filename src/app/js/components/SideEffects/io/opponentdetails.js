import DSportRank from '../../../../../ABIaddress';
import web3 from '../../../../../web3';

  export const opponentdetails = async (opponentaddress) => {
          //looks, for contract, like we don't need to provide an address (but we do for gas estimate)
          const account = web3.givenProvider.selectedAddress;
          const owner = await DSportRank.methods.owners(opponentaddress).call();
          const details = await DSportRank.methods.users(owner).call();
          return details;
      }
