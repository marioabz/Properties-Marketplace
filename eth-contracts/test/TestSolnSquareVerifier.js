// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let { proof, inputs } = require("./proof_right");
const truffleAssert = require('truffle-assertions');

let user;
let user1;
let user2;

contract('Verifier', async accounts => {
    user = accounts[0];
    user1 = accounts[3];
    user2 = accounts[4]
})

it('Adding solution to SolnSquareContract', async () => {
    let _result;
    const SolnSquareContract = await SolnSquareVerifier.deployed()
    let key = await SolnSquareContract.getKey.call(
        proof.a, proof.b, proof.c, [3, 9]);
    let resultSolution = await SolnSquareContract.calculateSolution(10, user2, key)
    truffleAssert.eventEmitted(resultSolution, "AddedSolution", (ev)=>{
        _result = ev.index.toNumber() === 10;
        return _result;
    })
})

it('Token can be minted', async () => {
    const SolnSquareContract = await SolnSquareVerifier.deployed()
    let totalSupplyBefore = await SolnSquareContract.totalSupply.call();

    await SolnSquareContract.mintToken(
        user2, 10, proof.a,
        proof.b, proof.c, inputs, {gas:4712388}
    );
    let totalSupplyAfter = await SolnSquareContract.totalSupply.call();
    
    assert.equal(
        totalSupplyAfter.toNumber(), 
        totalSupplyBefore.toNumber() + 1, 
        "Verifier not working"
    );
})