var ERC721Mintable = artifacts.require('ERC721Mintable');
const truffleAssert = require('truffle-assertions');

let account_one;
let account_two;
let account_three;

contract('TestERC721Mintable', accounts => {

    account_one = accounts[0];
    account_two = accounts[1];
    account_three = accounts[2];
})

it('should return total supply', async () => {

    const contract = await ERC721Mintable.deployed()
    await contract.mint(account_two, 7);
    let totalSupply = await contract.totalSupply.call()
    assert.equal(1, totalSupply, "Total supply is set wrong")
})

it('should get token balance', async function () {
    const contract = await ERC721Mintable.deployed()
    await contract.mint(account_two, 8);
    let totalSupply = await contract.totalSupply.call()
    let balance = await contract.balanceOf.call(account_two);
    assert.equal(balance.toNumber(), 2, "Total balance does not add up")
})

// token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
it('should return token uri', async function () { 
    const contract = await ERC721Mintable.deployed()
    let tokenURI = await contract.tokenURI.call(7)
    assert.equal(
        tokenURI,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + 7,
        "TokenURI is not the same"
    )
})

it('should transfer token from one owner to another', async function () { 
    const contract = await ERC721Mintable.deployed()
    await contract.transferFrom(account_two, account_three, 7, {from: account_two})
    let newOwner = await contract.ownerOf.call(7)
    assert.equal(newOwner, account_three, "Transfer did not go well")
})

it('should fail when minting when address is not contract owner', async function () { 
    const contract = await ERC721Mintable.deployed()
    err = false
    try {
        await contract.mint(account_two, 9, {from: account_two})
    } catch(e) {
        err = true
    }
    assert.equal(true, err, "Minting didn´t go well")
})

it('should return contract owner', async function () {
    let _result;
    const contract = await ERC721Mintable.deployed()
    let changingOwner = await contract.transferOwnership(account_two);
    truffleAssert.eventEmitted(changingOwner, "TransferOwnership", (ev) => {
        _result = ev._newOwner === account_two
        return _result
    })
    assert.equal(true, _result, "Changin owner didn`t work")
})
