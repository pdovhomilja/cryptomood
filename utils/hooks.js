import { useState, useEffect, useCallback } from "react";

import { getSymbols, findByValue } from "../utils";
import { CRYPTOCURRENCIES } from "../configs";

const useTicker = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(CRYPTOCURRENCIES);
  console.log(cryptocurrencies);

  const fetchCrypto = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(
          getSymbols()
        )}`
      );
      const data = await response.json();
      console.log(data, "data from Hook");

      setCryptocurrencies(
        cryptocurrencies.map((crypto) => {
          const { lastPrice, lowPrice, highPrice } =
            findByValue(data, crypto.symbol) || {};
          return {
            ...crypto,
            price: lastPrice,
            lowPrice,
            highPrice,
            prevPrice: crypto?.price || 0,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [cryptocurrencies]);

  useEffect(() => {
    const interval = setInterval(fetchCrypto, 2000);
    return () => clearInterval(interval);
  });

  return cryptocurrencies;
};

export { useTicker };
