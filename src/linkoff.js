import web3 from './web3';
// const fs = require('fs-extra');
// import fs from 'fs-extra';
let ethContract;

if (web3 !== null) {
  console.log(web3.version);
  console.log("Got3");
  const address = '0x5dBcc099145Dacf1b924D8F9ce5aF1D03FFd854b';
  const contractObj = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "chairperson",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "checkIfNextRoundAndPickWinner",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "currentRoundNum",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "subId",
              "type": "uint256"
            }
          ],
          "name": "downvoteSubmissionById",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "subId",
              "type": "uint256"
            }
          ],
          "name": "getCurrentRoundSubmissions",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "roundIntervalSeconds",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "roundStartTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "roundSubAddrs",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "roundSubAddrsKeys",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "roundSubLinks",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "roundSubLinksKeys",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "subCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "submissions",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "subId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "subAddr",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "subUrl",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subCaption",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "roundNumber",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "upvoteCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downvoteCount",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "url",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "caption",
              "type": "string"
            }
          ],
          "name": "submitLink",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "theGloatLinks",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "theGloats",
          "outputs": [
            {
              "internalType": "address",
              "name": "subAddr",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "subUrl",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subCaption",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "roundNumber",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "upvoteCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downvoteCount",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "subId",
              "type": "uint256"
            }
          ],
          "name": "upvoteSubmissionById",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
  ];

  ethContract = new web3.eth.Contract(contractObj, address);
}
else{
  console.log("No 3");
  ethContract = null
}




export default ethContract;