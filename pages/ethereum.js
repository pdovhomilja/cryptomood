import { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { createChart } from "lightweight-charts";

let socket;

const Ethereum = () => {
  const [input, setInput] = useState("");
  const [candle, setCandle] = useState("");

  /*   useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: "white",
        background: { type: "solid", color: "black" },
        width: 400,
        height: 300,
      },
    };
    const chart = createChart(document.getElementById("chart"), chartOptions);
    const lineSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    lineSeries.setData([
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ]);
  }, []); */

  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: "white",
        background: { type: "solid", color: "black" },
      },
    };
    const chart = createChart(document.getElementById("chart"), chartOptions);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const data = [
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ];

    candlestickSeries.setData(data);

    // chart.timeScale().fitContent();
  }, []);

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
      socket.on("update-candle", (msg) => {
        setCandle(msg);
      });
    };
    socketInitializer();
  }, []);

  setInterval(() => {
    socket?.emit("input-change", "ethPrice");
    socket?.emit("candle-change", "CandleData");
  }, 1000);

  //console.log(input, "input");
  console.log(candle, "candle");

  return (
    <div>
      <div>ETH price in USD: {input}</div>
      {candle && (
        <div className="flex flex-row ">
          <div>Open: {parseFloat(candle.o).toFixed(2)}</div>
          <div>High: {parseFloat(candle.h).toFixed(2)}</div>
          <div>Low: {parseFloat(candle.l).toFixed(2)}</div>
          <div>Close: {parseFloat(candle.c).toFixed(2)}</div>
          <div>Volume: {candle.v}</div>
          <div>
            Close time: {moment(candle.T).format("DD.MM.YYYY HH:mm:ss")}
          </div>
          <div>Quote asset volume: {candle.q}</div>
          <div>Number of trades: {candle.n}</div>
          <div>Taker buy base asset volume: {candle.V}</div>
          <div>Taker buy quote asset volume: {candle.Q}</div>
          <div>Ignore: {candle.B}</div>
        </div>
      )}
      <div id="chart"></div>
    </div>
  );
};

export default Ethereum;
