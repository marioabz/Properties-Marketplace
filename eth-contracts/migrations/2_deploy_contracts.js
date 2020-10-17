// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

let deployAddress = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier, deployAddress);
};

