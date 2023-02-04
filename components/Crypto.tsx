/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

import Loader from "./Loader";
import Status from "./Status";
import { formatPrice } from "../utils";

interface Props {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    iconCode: number;
    price: number;
    highPrice: number;
    lowPrice: number;
    prevPrice: number;
    explorer: string;
  };
}

function Crypto({ crypto }: Props) {
  const colorClassName = crypto.prevPrice
    ? crypto.price > crypto.prevPrice
      ? "text-green-500"
      : "text-red-500"
    : "text-gray-300";
  return (
    <div className="max-w p-6 bg-black border border-gray-100/50 rounded-lg shadow-lg">
      <img
        className="w-10 h-10 mb-2 rounded-full"
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.iconCode}.png`}
        alt={crypto.name}
      />
      <h5
        className="mb-1 text-2xl font-semibold tracking-tight text-gray-600
      "
      >
        {crypto.name}
      </h5>
      {crypto.price ? (
        <>
          <span className={colorClassName} title={`${crypto.price}`}>
            {formatPrice(crypto.price)}
          </span>
          <div>
            <Status label="24h High" value={formatPrice(crypto.highPrice)} />
            <Status label="24h Low" value={formatPrice(crypto.lowPrice)} />
            <Status label="Market" value={crypto.symbol} />
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
      <a
        className="inline-flex items-center text-blue-600 mt-6"
        href={crypto.explorer}
        target="_blank"
        rel="noreferrer"
      >
        Explorer
        <svg
          className="inline w-4 h-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 00-1 1v4.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 9.586V5a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}

export default memo(Crypto);
