pragma solidity >=0.4.21 <0.6.2;

import './Verifier.sol';
import './ERC721Mintable.sol';


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract _Verifier is Verifier {}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, _Verifier {

    constructor(string memory _name, string memory _symbol) 
    CustomERC721Token(_name, _symbol) public {
    }
    // TODO define a solutions struct that can hold an index & an address
        struct Solution {
            uint256 index;
            address addrs;
        }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => address) public submitedSolutions;

    // TODO Create an event to emit when a solution is added
    event AddedSolution(uint index, address addr);

    // TODO Create a function to add the solutions to the array and emit the event
    function getKey(uint[2] memory a, uint[2][2] memory b, 
                    uint[2] memory c, uint[2] memory input) 
                    pure public returns(bytes32) {
        
        return keccak256(abi.encode(a, b, c, input));
    }

    function calculateSolution(uint _index, address _address, bytes32 _key) public {
        Solution memory solution = Solution({index: _index, addrs: _address});
        solutions.push(solution);
        submitedSolutions[_key] = _address;
        emit AddedSolution(_index, _address);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mintToken(
        address _to, 
        uint256 _tokenId, 
        uint[2] memory a,
        uint[2][2] memory b, 
        uint[2] memory c, 
        uint[2] memory input) public {

            bytes32 _key = getKey(a,b,c,input);
            require(super.verifyTx(a,b,c,input), "Solution is wrong. Try again.");
            require(submitedSolutions[_key] == address(0), "Solution already exist");
            calculateSolution(_tokenId, _to, _key);
            super.mint(_to, _tokenId);
        }
    }