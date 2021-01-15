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

/* export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
}; */

const instance = new web3.eth.Contract(abi, '0x32e10ac339226531791d807bff7c7ebbaaf8cd66');
export default instance;
