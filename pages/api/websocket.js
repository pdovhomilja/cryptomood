const WebSocket = require("ws");
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Connected to WebSocket");

    ws.on("message", (message) => {
      console.log(message);
    });

    ws.send("Hello from the WebSocket server");
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
