import WebSocket from "ws";
import { Server } from "socket.io";
import moment from "moment";

const SocketHandler = (req, res) => {
  const wsTrades = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@trade"
  );
  const wsCandles = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@kline_1m"
  );

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let ethPrice;
    let tradeDate;
    let CandleData;

    wsTrades.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //console.log(data, "ETH/USD - Trades");
      ethPrice = parseFloat(data.p).toFixed(2);
      tradeDate = moment(data.T).format("DD.MM.YYYY HH:mm:ss");
      //res.socket.server.io.emit("ethPrice", ethPrice);
      console.log(ethPrice, "-", tradeDate, "ETH/USD");
    };

    wsCandles.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //console.log(data, "Candles data");
      CandleData = data.k;
    };

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", ethPrice);
      });
      socket.on("candle-change", (msg) => {
        socket.broadcast.emit("update-candle", CandleData);
      });
    });
  }
  res.status(200).send("Socket is running");
  res.end();
};

export default SocketHandler;
