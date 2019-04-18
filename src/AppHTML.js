import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import auth from './ABIaddress';
//import web3 from 'web3';

class AppHTML extends Component {

  constructor(props){
     super(props);
     //this.state = {requester : '', receiver:'', balance: '', message:''};

     this.state = {accounts : '', owners : '', balance: '', message:''};
   }

  async  componentDidMount(){
     //const owners = await auth.methods.owners().call();
     //const receiver = await auth.methods.receiver().call();
     //const approvers = await auth.methods.approvers(0).call();
     const balance = await web3.eth.getBalance(auth.options.address);
     const accounts = await web3.eth.getAccounts();

       //this.setState({owners, balance});
       this.setState({balance, accounts});

  }

  onSubmit = async (event)=>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();

      this.setState({message: 'Approving the smart contract ..... Mining in process ! '});

      await auth.methods.approve().send({from: accounts[0]});
     this.setState({message: 'Smart Contract approved'});
 };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Account is :  { this.state.accounts[0]}</p>
          <p> Approval amount is :  { this.state.balance} Wei </p>
          <h3>{this.state.message}</h3>


          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default AppHTML;
