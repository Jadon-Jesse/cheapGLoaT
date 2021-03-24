import Web3 from 'web3';

let web3;

// first check if we are on browser and userhas metamask
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // we are in browser
  // and user has metamask
  web3 = new Web3(window.ethereum);

  try {
      // Request account access if needed
      window.ethereum.enable()
      // Acccounts now exposed
  } catch (error) {
      // User denied account access...
      console.log("Unable to enable web3");
  }

}
else {
  console.log("Please use metamask to enable web3");
  // todo: add custom provider for non-metamask users
  web3 = null;
}


export default web3;