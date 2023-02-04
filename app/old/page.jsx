"use client";
import { data } from "autoprefixer";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [price, setPrice] = useState(null);
  const [token, setToken] = useState("bitcoin");
  const [tokenCount, setTokenCount] = useState("");
  const [data, setData] = useState("");
  const selectedTokenRef = useRef(null);

  useEffect(() => {
    //Use the fetch function to make a GET request to the endpoint
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Once we have the data, we can access the current price of Bitcoin
        // from the "data" object

        //console.log(data[`${token}`].usd, "Data");
        // Update the price state variable with the fetched data
        setPrice(data[`${token}`].usd);
      });
  }, [token]);

  //Testing Destructuring Objects and Arrays
  useEffect(() => {
    fetch("/api/tokenList")
      .then((response) => response.json())
      .then((responseData) => {
        const { data } = responseData;
        setData(
          data.map((data) => {
            return data;
          })
        );
        setTokenCount(data.length);
      });
  }, []);

  /*
  useEffect(() => {
    fetch("/api/tokenList")
      .then((response) => response.json())
      .then((data) => {
        const { data: arrayData } = data;
        arrayData.map((data) => {
          //console.log(data.id, data.name, data.symbol);
        });
      });
  }, []);
*/
  const selectToken = (e) => {
    e.preventDefault();
    setToken(selectedTokenRef.current.value);
    console.log(price, "Token price");
    console.log(token, "Selected token");
  };
  //console.log(tokenCount, "Token count");

  if (!data) {
    return (
      <div className="bg-black text-white flex items-center justify-center w-full h-screen">
        <div>Loading ...</div>
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col items-center justify-center w-full h-screen mx-auto text-white">
      <div>Tokens listed: {tokenCount}</div>
      <div className="text-white flex flex-col">
        <form>
          <label htmlFor="token">Choose Token:</label>
          <select
            className="text-black rounded-lg bg-gray-600"
            id="token"
            name="token"
            ref={selectedTokenRef}
          >
            {data.slice(0, 20).map((data) => (
              <option key={data._id} value={data.id}>
                {data.id}
              </option>
            ))}
          </select>
          <br />
          <button
            className="bg-gray-600 rounded-full px-2 border-white"
            onClick={selectToken}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        Actual price for {token}/USD price is: {price}
      </div>
      <div></div>
    </div>
  );
}
