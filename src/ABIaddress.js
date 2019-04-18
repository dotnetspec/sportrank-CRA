
import web3 from './web3';

const deployeAddress = '0x0b7a9bf185d2266f81f64e8e0848ab66a1dd3cc5';

const deployedAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "owners",
		"outputs": [
			{
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
				"name": "usernameHash",
				"type": "bytes32"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "rankingDefault",
				"type": "string"
			},
			{
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRankingAt",
		"outputs": [
			{
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
				"name": "username",
				"type": "string"
			},
			{
				"name": "contactno",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
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
				"name": "usernameHash",
				"type": "bytes32"
			}
		],
		"name": "userExists",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "creationDate",
				"type": "uint256"
			},
			{
				"name": "username",
				"type": "string"
			},
			{
				"name": "contactno",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "picture",
				"type": "string"
			},
			{
				"name": "rankingDefault",
				"type": "string"
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
				"name": "_from",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "challenge",
				"type": "string"
			},
			{
				"indexed": false,
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
				"name": "_from",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ranking",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Newranking",
		"type": "event"
	}
];

export default new web3.eth.Contract(deployedAbi,deployeAddress);
