import React from "react";
import Web3 from 'web3';
let SolnSquare = require("../assets/SolnSquareVerifier.json")
var contract = require("@truffle/contract");
var SolnSquareContract;
var instance;
let accounts;
let web3;

class PropertyController extends React.Component {

    constructor() {
        super();
        this.state = {
            propertyId: 0,
            counter: 0
        }
        this.mintToken = this.mintToken.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCounter = this.addToCounter.bind(this);
        this.initComponent();
    }

    render() {
        return(
            <div className="property">
                <div><input type="number" name="name" onChange={this.handleChange}/></div>
                <div><button onClick={this.mintToken}> Mint </button></div>
            </div>
    )}

    handleChange({target}) {
        this.setState({
            propertyId: target.value
        })
    }

    addToCounter() {
        this.setState(prevState => {
            return {counter: prevState.counter + 1}
        })
    }

    async mintToken() {
        let { proof, inputs } = require(`../assets/proof${this.state.counter}`);
        console.log(this.state.counter)
        let randN = Math.floor(Math.random() * 50);
        console.log(randN, randN*randN)
        let hash = await instance.mintToken(
            accounts[0],
            this.state.propertyId,
            proof.a,
            proof.b,
            proof.c,
            inputs,
            {from: "0x3617a67dfDfe04F6db6d2F4ddb75dB5574f4cF44", 
            gas: 5500000}
        )
        this.addToCounter()
    }

    initComponent() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try { 
                window.ethereum.enable().then(function() {
                // User has allowed account access to DApp...
                });
            } catch(e) {
                // User has denied account access to DApp...
            }
       }
       // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
       // Non-DApp Browsers
        else {
            alert('You have to install MetaMask !');
        }
    }

    async componentDidMount() {
        SolnSquareContract = contract({
            abi: SolnSquare.abi
        })
        SolnSquareContract.setProvider(web3.currentProvider)
        instance = await SolnSquareContract.at(
            "0x211D01f42fE1829d8C40678990e818Bfd111AE97"
        ) 
        accounts = await web3.eth.getAccounts();
    }

}

export default PropertyController