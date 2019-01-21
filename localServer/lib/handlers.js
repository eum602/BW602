/**
 * these are the request handlers
 */
//Dependencies
const helpers = require('./helpers')

//define the handlers
const handlers = {}
/**
 * JSON API handlers
 * */
//Proof of Work
handlers.proofOfWork = (data,callback) => {
    const acceptableMethods = ['post']//,'put','delete']
    if(acceptableMethods.indexOf(data.method)>-1){
        //handlers._users[data.method](data,callback)
        //console.log('payload received in pow handler is: ', data.payload)
        const previousBlockHash = data.payload.previousBlockHash
        const currentBlockData = data.payload.currentBlockData        
        let nonce = 0
        let hash = helpers.hashBlock(previousBlockHash, currentBlockData, nonce)
        while (
        hash.substring(0, 5) !== '00009') {
            nonce++;
            hash = helpers.hashBlock(previousBlockHash, currentBlockData, nonce);
        }
        //console.log('El pow has found a hash which value is: ' + hash)
        //return nonce
        callback(200,{'nonce':nonce})
    }else if(data.method==='options'){
        callback(200)
    } else{
        callback(405)
    }
}

//ping handler
handlers.ping = (data,callback)=>{
        callback(200)
}
//Not found handler
handlers.notFound = (data,callback)=>{
        callback(404)//does not need a payload
}
//export the module
module.exports = handlers