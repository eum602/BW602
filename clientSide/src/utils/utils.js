const utils = {}
//Ajax client (for the restful API)
utils.client = {}

// Interface for making API calls
utils.client.request = (headers,path,method,queryStringObject,payload,callback)=>{
//set defaults
headers = typeof(headers)==='object' && headers!==null ? headers:{}
path = typeof(path) === 'string' ? path:'/'
method = typeof(method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) >-1 ? method.toUpperCase():'GET'
queryStringObject = typeof(queryStringObject)==='object' && queryStringObject!==null ? queryStringObject:{}
payload = typeof(payload)==='object' && payload!==null ? payload:{}
callback = typeof(callback) === 'function' ? callback:false

//for each query String  parameter sent, add it to the path
  let requestUrl = path + '?'
  let counter = 0
  for(let queryKey in queryStringObject){
      if(queryStringObject.hasOwnProperty(queryKey)){
        counter++
        //If  at least one query string parameter has already been added, prepend  new ones with ampersand
        if(counter>1){
            requestUrl +='&'
        }
        //Add the key and value
        requestUrl += queryKey + '=' + queryStringObject[queryKey]
      }
  }

  //form the http request as a json type
  let xhr = new XMLHttpRequest()
  xhr.open(method,requestUrl,true)
  xhr.setRequestHeader("Content-Type","application/json")
  //For each header  sent add it to the request ne by one
  for(let headerKey in headers){
      if(headerKey.hasOwnProperty(headerKey)){
          xhr.setRequestHeader(headerKey,headers[headerKey])
      }
  }


  //if there is a current session token set, add that as a header
  //if(utils.config.sessionToken){
//       xhr.setRequestHeader("token",'utils.config.sessionToken.id')
//   }

  //When the request comes back handle the response
  xhr.onreadystatechange = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){//means the request is done
        let statusCode = xhr.status
        let responseReturned = xhr.responseText

        //Callback if requested
        if(callback){
            try{
                const parsedResponse = JSON.parse(responseReturned)
                callback(statusCode,parsedResponse)
            }catch(e){
                callback(statusCode,false)
            }
        }
      }
  }
  //Set the payload as json
const payloadString = JSON.stringify(payload)
xhr.send(payloadString)
}

utils.client.greet = () =>{
    console.log('hello world')
}

export default utils