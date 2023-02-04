"use client";
import React, { useEffect, useState } from "react";
//fetch bitcoin price with ccxt library from binance
//const ccxt = require("ccxt");

function Page() {
  const [btcPriceCoinbase2, setBtcPriceCoinbase2] = useState(0);
  const [interval, setInterval] = useState(0);
  //new state which value change every 5 seconds

  //fetch bitcoin price with ccxt library from bitmex and all other exchanges
  useEffect(() => {
    try {
      fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot")
        .then((response) => response.json())
        .then((data) => {
          // Print the current price of Bitcoin
          console.log(data.data.amount);
          setBtcPriceCoinbase2(data.data.amount);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col mx-auto border border-black items-center justify-center h-screen">
      <h1>BTC Price Coinbase (from Coinbase) is: {btcPriceCoinbase2} </h1>
    </div>
  );
}

export default Page;
