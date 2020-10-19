// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

let deployAddress = "0x63c21e076cd65Fff647D0396B1Ff641EAE9A4DB0";
module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
};

