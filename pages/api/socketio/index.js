import WebSocket from "ws";
import { Server } from "socket.io";
import moment from "moment";

const SocketHandler = (req, res) => {
  const wsTrades = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@trade"
  );

  /*   const wsQuotas = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@depth"
  ); */

  //wss://stream.binance.com:9443/ws/ethusdt@ticker

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let ethPrice;
    let tradeDate;

    wsTrades.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //console.log(data, "ETH/USD - Trades");
      ethPrice = parseFloat(data.p).toFixed(2);
      tradeDate = moment(data.T).format("DD.MM.YYYY HH:mm:ss");
      //res.socket.server.io.emit("ethPrice", ethPrice);
      console.log(ethPrice, "-", tradeDate, "ETH/USD");
    };

    io.on("connection", (socket) => {
      //console.log(socket.on);
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", ethPrice);
      });
    });
  }
  res.status(200).send("Socket is running");
  res.end();
};

export default SocketHandler;
