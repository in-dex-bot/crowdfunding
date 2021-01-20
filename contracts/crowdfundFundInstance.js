/* eslint-disable */
import web3 from './web3';

const abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "contributeF",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractF",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "contributionsF",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creatorF",
		"outputs": [
			{
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
		"inputs": [],
		"name": "descriptionF",
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
		"constant": true,
		"inputs": [],
		"name": "amountGoalF",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDetailsF",
		"outputs": [
			{
				"name": "fundStarter",
				"type": "address"
			},
			{
				"name": "fundContractToFund",
				"type": "string"
			},
			{
				"name": "fundDesc",
				"type": "string"
			},
			{
				"name": "currentStateF",
				"type": "uint8"
			},
			{
				"name": "currentAmountF",
				"type": "uint256"
			},
			{
				"name": "goalAmountF",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentBalanceF",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stateF",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "fundStarter",
				"type": "address"
			},
			{
				"name": "fundContractToFund",
				"type": "string"
			},
			{
				"name": "fundDesc",
				"type": "string"
			},
			{
				"name": "fundAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contributorF",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amountF",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "currentTotalF",
				"type": "uint256"
			}
		],
		"name": "FundingReceivedF",
		"type": "event"
	}
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
