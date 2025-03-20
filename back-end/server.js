// // Import dependencies
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// // Initialize the app and server
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Serve the frontend files (if needed)
// app.use(express.static('public'));

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('A user connected: ', socket.id);

//   // Emit the user's unique ID to the client
//   socket.emit('yourID', socket.id);

//   // Handle incoming call from a user
//   socket.on('callUser', (data) => {
//     io.to(data.userToCall).emit('hey', {
//       signal: data.signalData,
//       from: data.from,
//     });
//   });

//   // Handle accepting a call
//   socket.on('acceptCall', (data) => {
//     io.to(data.to).emit('callAccepted', data.signal);
//   });

//   // Handle ending the call
//   socket.on('endCall', (data) => {
//     io.to(data.to).emit('callEnded');
//   });

//   // When user disconnects
//   socket.on('disconnect', () => {
//     console.log('User disconnected: ', socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || ;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
