import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Ethereum = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socketio");
      socket = io();
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("update-input", (msg) => {
        setInput(msg);
      });
    };
    socketInitializer();
  }, []);

  setInterval(() => {
    socket?.emit("input-change", "ethPrice");
  }, 1000);

  console.log(input, "input");
  return (
    <div>
      ETH price in USD: {input}
      <div></div>
    </div>
  );
};

export default Ethereum;
