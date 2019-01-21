# BW602
This is aproject which main goal is to create a blockchain by using WebRTC technology, so any people over the browser can use this technology, even if that user is behind a symetric NAT.
All the project is built using Node.js, react.js and webRTC technology.

## How it works?
1.  The server assign an automatic id (node_uuid) to every user who visits the page; also that user will be able to connect with any other FOUR users which also visit the page.
2.  At the same time,webRTC, which is embeded in the client side, starts to recover ICE candidates(these are like paths that every user has in order to establish a P2P communication with another user).
3. After collecting all ICE candidates, these are transmited to other user,who also wants to enter into the network, by using sockets, the routing is made by a logic embedded in the server side.Now the users are fully connected and the server says goodbye(it means it does not interfere in the communication). If the communication between peers is broken the the server try to connect again to any other user available over the network.
4. Now that peers are fully connected they are able to exchange data, in this case the data are blocks and transactions.
5. Every user with at least one peer connection is able to create and mine transactions(PoW).
6. Every user who wants to run PoW in order to find the hash and nonce of the next block in the blockchain must run a local server that performs that operation. This project makes use of Node.js to run the local server, what is more, the local server use cluster module so even when the local node is performing into a loop the PoW, it is able to respond other actions for instance respond to user for some stats by using its CLI; furthermore by using a local server for PoW avoids the webApp be caugth into a loop(calculating PoW), so the user can make other actions in the front end while the local server is working to find the solution in order to create the next block in the blockchain.

## THE SECOND COMMIT IS AIMED TO RUN A LOCAL SERVER BUILT ON NODE.JS, THIS SERVER PERFORM THE PoW(PROOF OF WORK).


## Steps:

1.**clone the repository**

2. **Install the dependencies**    
    ```
    2.1. Go into the clientSide folder and run npm install
    ```
    ```
    2.2. Go into the serverSide folder and run npm install
    ```

3. **Start the webApp**
    ```
    3.1. Go into the clientSide folder and run node server.js(it will run on the 4001 port).
    ```
    ```
    3.2. Go into the serverSide folder and run npm start(it will run on the 3000 port).
    ```
    
4. **Start a local server(it will run on the 7000 port)**
    ```
    4.1. Go into the localServer folder and run NODE_DEBUG=server NODE_ENV=staging node index-cluster.js
    ```    

5. **Test the webApp**

    5.1. Go to the Chrome browser and open http://localhost:3000/, Once there you can click on the "create Genesis Block" button and after that insert some values, after that click on createBlockchain button.
    
    5.2. Open an incognito browser and go to http://localhost:3000/
    
    5.3. In the normal chrome window, you can click on operations button, then createTransaction button and create transaction.
    
    5.4. After creating some transactions you can click in operations button, then getPendingTrasactions button to see all the pending transaction.
    
    5.5. You can also click on the "mine" button to start the mining process which is starts the PoW (proof of work) algorithm. This algorithm is time consuming, so the difficulty has been fixed to be minimum.
    
    5.6. If you go to the incognito window and click on the home button then you will see that the newly created block has been received by the incognito node.
    
    5.7. You can now make any operation in any browser the incognito or the normal window browser and you will see that the transations and new created blocks by making PoW are reflected in the other node.
    
