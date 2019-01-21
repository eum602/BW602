# BW602
This is an open source project which main goal is to create a blockchain by using WebRTC technology, so any people over the browser can use this technology, even if that user is behind a symetric NAT.
All the project is built using Node.js and react.js.

## How it works?
1.  The server assign an automatic id (node_uuid) to every user who visits the page; also that user will be able to connect with any other FOUR users which also visit the page.
2.  At the same time,webRTC, which is embeded in the client side, starts to recover ICE candidates(these are like paths that every user has).
3. After collecting all ICE candidates, these are transmited to other user,who also wants to enter into the network, by using sockets, the routing is made by a logic embedded in the server side.Now the users are fully connected and the server says goodbye(it means it does not interfere in the communication). If the communication between peers is broken the the server try to connect again to any other user available over the network.
4. Now that peers are fully connected they are able to exchange data, in this case the data are blocks and transactions.
5. Every user with at least one peer connection is able to create and mine transactions.


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
    3.1. Go into the clientSide folder and run node server.js
    ```
    ```
    3.2. Go into the serverSide folder and run npm start
    ```

4. **Test the webApp**

    4.1. Go to the Chrome browser and open http://localhost:3000/, Once there you can click on the "create Genesis Block" button and after that insert some values, after that click on createBlockchain button.
    
    4.2. Open an incognito browser and go to http://localhost:3000/
    
    4.3. In the normal chrome window, you can click on operations button, then createTransaction button and create transaction.
    
    4.4. After creating some transactions you can click in operations button, then getPendingTrasactions button to see all the pending transaction.
    
    4.5. You can also click on the "mine" button to start the mining process which is starts the PoW (proof of work) algorithm. This algorithm is time consuming, so the difficulty has been fixed to be minimum.
