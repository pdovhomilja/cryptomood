import { useEffect, useState } from "react";
import io from "socket.io-client";

//import { createChart, ColorType } from "lightweight-charts";
//import { createChart } from "lightweight-charts";

let socket;

/* const chart = createChart(document.getElementById("chart"), {
  width: 400,
  height: 300,
});
const lineSeries = chart.addLineSeries();
lineSeries.setData([
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  { time: "2019-04-13", value: 76.64 },
  { time: "2019-04-14", value: 81.89 },
  { time: "2019-04-15", value: 74.43 },
  { time: "2019-04-16", value: 80.01 },
  { time: "2019-04-17", value: 96.63 },
  { time: "2019-04-18", value: 76.64 },
  { time: "2019-04-19", value: 81.89 },
  { time: "2019-04-20", value: 74.43 },
]); */

const Ethereum = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch(
        `${
          process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL
        }/api/socketio`
      );
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
