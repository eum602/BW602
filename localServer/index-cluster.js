 /*
 *primary file for the api
 *
 * * 
 * */
//Dependencies
const server = require('./lib/server')
const cli =  require('./lib/cli')
const cluster =  require('cluster')
const os = require('os')
//Declare the app
const app = {}

//Init function
app.init = (callback) =>{
        //if we are on the master thread, start the background workers and the CLI
        if(cluster.isMaster){
                //start the cli, but make sure it starts last
                setTimeout(()=>{
                        cli.init()
                        callback()
                },50)

                //Fork the process
                for(let i=0;i<os.cpus().length;i++){
                        cluster.fork()
                }
        }else{
                //if we a re not on the master thread, start the http server
                server.init()
        }
}

//Self invoking only if required directly
if(require.main === module){
        app.init(()=>{})
}


//Export the app
module.exports = app
