const WebSocketExample = async () => {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusd@trade");

  ws.onopen = () => {
    console.log("WebSocket connected");
  };
  ws.onmessage = (event) => {
    setData(event.data);
  };
  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return (
    <div>
      <p>Data from WebSocket: {data}</p>
    </div>
  );
};

export default WebSocketExample;
