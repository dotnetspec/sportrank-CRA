
import web3 from './web3';
//import web3 from 'web3';
//local ganache:
const deployeAddress = '0x42d278eae5cdf61f8f1352f0990a62197587c348';
//Rinkeby:
//const deployeAddress = '0x43bfb40d6b45dc0370574c67465b3db83618708e';


const deployedAbi = [
{
	"constant": true,
	"inputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"name": "owners",
	"outputs": [
		{
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"internalType": "string",
			"name": "content",
			"type": "string"
		}
	],
	"name": "ranking",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"internalType": "bytes32",
			"name": "usernameHash",
			"type": "bytes32"
		},
		{
			"internalType": "string",
			"name": "contactno",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "email",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "description",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "rankingDefault",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "pictureHash",
			"type": "string"
		}
	],
	"name": "editAccount",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"internalType": "uint256",
			"name": "index",
			"type": "uint256"
		}
	],
	"name": "getRankingAt",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"internalType": "string",
			"name": "username",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "contactno",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "email",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "description",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "rankingDefault",
			"type": "string"
		}
	],
	"name": "createAccount",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"internalType": "string",
			"name": "content",
			"type": "string"
		}
	],
	"name": "challenge",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"internalType": "bytes32",
			"name": "usernameHash",
			"type": "bytes32"
		}
	],
	"name": "userExists",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": false,
	"inputs": [],
	"name": "turnOffOn",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": true,
	"inputs": [],
	"name": "contractOwner",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		}
	],
	"name": "users",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "creationDate",
			"type": "uint256"
		},
		{
			"internalType": "string",
			"name": "username",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "contactno",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "email",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "description",
			"type": "string"
		},
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "string",
			"name": "picture",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "rankingDefault",
			"type": "string"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": true,
	"inputs": [],
	"name": "creationTime",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "bytes32",
			"name": "_from",
			"type": "bytes32"
		},
		{
			"indexed": false,
			"internalType": "string",
			"name": "challenge",
			"type": "string"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "time",
			"type": "uint256"
		}
	],
	"name": "Newchallenge",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "bytes32",
			"name": "_from",
			"type": "bytes32"
		},
		{
			"indexed": false,
			"internalType": "string",
			"name": "ranking",
			"type": "string"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "time",
			"type": "uint256"
		}
	],
	"name": "Newranking",
	"type": "event"
}
];

export default new web3.eth.Contract(deployedAbi,deployeAddress);
