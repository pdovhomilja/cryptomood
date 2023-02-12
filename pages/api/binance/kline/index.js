const WebSocket = require("ws");
const fs = require("fs");

const SocketHandler = (req, res) => {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

  ws.on("open", () => {
    console.log("Connected to Binance WebSocket API");
  });

  ws.on("message", (data) => {
    const kline = JSON.parse(data);
    fs.appendFileSync("historical_data.json", JSON.stringify(kline) + "\n", {
      flag: "a",
    });
    console.log(`Received kline data: ${kline}`);
  });

  ws.on("close", () => {
    console.log("Disconnected from Binance WebSocket API");
  });
  return res
    .status(200)
    .json({ message: "Connected to Binance WebSocket API" });
};

export default SocketHandler;
