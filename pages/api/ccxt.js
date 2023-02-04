// On the server-side
import ccxt from "ccxt";
import io from "socket.io";
import http from "http";

// Set up the exchange object
const exchange = new ccxt.kraken({ enableRateLimit: true });

console.log(exchange, "exchange");

// Create an HTTP server
const app = require("express")();
const server = http.createServer(app);

// Set up Socket.io
const socket = io(server);

// Connect to the websocket
exchange.ws.on("message", (data) => {
  // Send the data to the browser
  socket.emit("tradeData", data);
});

exchange.ws.on("error", (error) => {
  // Handle the error
  console.log(error);
});

exchange.ws.on("open", () => {
  // Subscribe to the channel you want to receive data from
  exchange.ws.subscribeTrades("BTC/USD");
});

exchange.ws.open();

// Start the server
server.listen(3000, () => {
  console.log("Socket.io server listening on port 3000");
});
