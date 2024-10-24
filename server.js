// serverB.js
const express = require('express');
const http = require('http');
const { io } = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const PORT_B = 4000;

// Connect to Server A
const socketA = io('http://localhost:3000');

socketA.on('connect', () => {
    console.log('Connected to Server A');

    // Listen for IMEI from Server A
    socketA.on('sendIMEI', (imei) => {
        console.log('Received IMEI from Server A:', imei);
        
        // Send ACK back to Server A
        socketA.emit('response', 'ACK');
    });

    // Listen for position updates from Server A
    socketA.on('positionUpdate', (positions) => {
        console.log('Position update from Server A:', positions);
    });
});

server.listen(PORT_B, () => {
    console.log(`Server B is running on http://localhost:${PORT_B}`);
});
