import React, {Component} from 'react';
//import SHA256 from "crypto-js/sha256";
import {Link} from 'react-router-dom'
import {Menu,Button} from "semantic-ui-react";
import Layout from '../Style/Layout';
import Blockchain from '../Blockchain/Blockchain'
import PendingTransactions from '../Blockchain/PendingTransactions';
import sendData from '../wrtconf/SendData';
import ShowLatestBlock from '../Blockchain/ShowLatestBlock';
import utils from '../utils/utils';

class MineBlock extends Component {
  state = {
    blockchain: new Blockchain(),
    pending_transactions : null
  }

 getPendingTransactions = ()=>{
   let a = new Promise((resolve,reject)=>{
     resolve(this.state.blockchain.getPendingTransactions())
     reject('Error getting pending transactions')
   }).then(res=>{
    console.log('pendingTransactions: ' , res )
    //return res
    const pending_transactions = [...res]
    this.setState({pending_transactions})
   })
   return a
 }

 mine = () => {   
  let previousBlockHash = null
  let currentBlockData = null  
  let hash = null
  let newBlock = null

   this.setState({mining:true})
   new Promise((resolve,reject)=>{
     resolve(this.getPendingTransactions())
     reject('Error getting pending transactions in mine method')
   })
   .then(r=>{
    let lastBlock = new Promise((resolve,reject)=>{
      resolve(this.state.blockchain.getLastBlock())
      reject('Error getting last block')
    })
    return lastBlock
   })
   .then(lastblock=>{
     previousBlockHash = lastblock.hash
     currentBlockData = [...this.state.pending_transactions]
     const payload = {'previousBlockHash':previousBlockHash,'currentBlockData':currentBlockData}
     console.log('hash of lastBlock extracted from pouch in ClientMineBlock Component: ' , previousBlockHash)
     /**
      * create a post request to a local node.js in order to make the POW locally
      * 
     */    
    utils.client.request(undefined,'http://127.0.0.1:7000/node/pow','POST',undefined,payload,(statusCode,responsePayload)=>{
        // Set the app.config token as false
        //app.setSessionToken(false)
        console.log('response from the local server: ',statusCode,responsePayload)
        const nonceFound = responsePayload.nonce
        console.log('Ready!! , nonce catched on PoW in ClientMineBlock component' , nonceFound)
        new Promise((resolve,reject)=>{
          resolve(this.state.blockchain.hashBlock(previousBlockHash, currentBlockData, nonceFound))
          reject('Error getting the hash of the block')
        }).then(blockHash => {
          hash = blockHash
          console.log('blockHash verified in ClientMineBlock: ', blockHash )
          const response = new Promise((resolve,reject)=>{
            resolve(this.state.blockchain.createNewBlock(nonceFound, previousBlockHash, hash, currentBlockData))
            reject('........')
          })
          return response
         })
         .then(block=>{
           newBlock = block
           console.log('response after create block in ClientMineBlock...',block)
           let broadcast = new Promise((resolve,reject)=>{
             resolve(sendData({'data':block,'type':'block','peerConns':this.props.peerConns}))
             //reject(console.log('could not send block to another peers'))
           })
           return broadcast
        })
        .then(resultBroadcast=>{
          this.setState({resultBroadcast,newBlock,mining:false,pending_transactions:null})          
        })
        .catch(err => {
          console.log('error when trying the mining process: ',err)
        })
    })
   }).catch(err=>{
    console.log('error getting last block: ',err)
   })
   
 }

 headers = () => {
    return(
      <Menu>
        <Menu.Menu style={{ marginBottom: "1px", marginLeft:"0px" }} >      
            <Link to = "/operations/createTransaction">              
                <Button
                  content="Create Transaction"
                  icon="add circle"
                  labelPosition="right"
                  floated="right"
                  primary           
                  disabled = {false}
                />
            </Link>
        </Menu.Menu>
        
        <Menu.Menu style={{ marginBottom: "2px" , marginLeft:"100px"}}>
          <Button
              content="Get Pending Transactions"
              icon="add circle"
              labelPosition="left"
              floated="left"
              onClick={this.getPendingTransactions}
              primary     
              disabled = {false/*this.state.created*/}
            />
            </Menu.Menu >

            <Menu.Menu position = "right" style={{ marginBottom: "1px" }}>
            <Button
              content="Mine"
              icon="add circle"
              labelPosition="right"
              floated="left"
              onClick={this.mine}
              primary
              disabled = {false/*this.state.created*/}
              loading = {this.state.mining}
            />
            </Menu.Menu>     
              
      </Menu>)
 }

 showMinedBlock = () =>{
   if(this.state.newBlock){
     return <ShowLatestBlock block={this.state.newBlock}/>
   }
 }

 renderPendingTxHandler = () => {
   if(!(this.state.pending_transactions===null)){
     return(<PendingTransactions pending_transactions = {this.state.pending_transactions}/>)
   }
 }
  
render(){
    return(
      <Layout>
        {this.headers()}
        {this.state.resultBroadcast}
        {this.showMinedBlock()}
        {this.renderPendingTxHandler()}
      </Layout>
    )
  }
}
export default MineBlock;
