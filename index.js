require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const io = require('socket.io-client');

app.listen(port, () => {
  var socketToken = process.env.SOCKET_API_TOKEN
  var socketUrl = process.env.SOCKET_URL

  const url = `${socketUrl}?token=${socketToken}`
  socket = io(url, { transports: ['websocket'] })

  //see https://dev.streamlabs.com/docs/socket-api for event types
  socket.on("event", (e) => {
    if (e.for === "youtube_account") {
      console.log('eventData: ', e)
    }
    else if (e.for === "streamlabs") {
      console.log('eventData: ', e)
    }
  });

  socket.on('connect_timeout', (e) => console.log("Connection Timeout", e))
  socket.on('error', (e) => console.log("Error", e))
  socket.on("connect_error", (error) => {
    setTimeout(() => {
      console.log(error)
      console.log("Connecting...")
      socket.connect();
    }, 1000);
  });
  socket.on("connect", () => {
    console.log("Connected");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.connect()
})
