import WebSocket from "ws";

export default function handler(req, res) {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    //console.log(parseFloat(data.p).toFixed(2), "ETH/USD");
  };
  res.statusCode = 200;
  res.json({ name: "John Doe" });
}
