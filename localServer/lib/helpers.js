/**
 * Helpers for various tasks
 */
//Dependencies
const crypto = require('crypto')
const helpers = {}

//hash block
helpers.hashBlock = (previousBlockHash, currentBlockData, nonce) => {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = crypto.createHash('sha256').update(dataAsString).digest('hex');//helpers.hash(dataAsString)//sha256(dataAsString)
    return hash
}

//Parse  a JSON string to an object  in all cases without throwing
helpers.parseJsonToObject = str => {
    try{
        const obj = JSON.parse(str)
        return obj
    }catch(e){
        //console.log('error parsing to object' , e)
        return {}
    }
}

//export the module
 module.exports = helpers