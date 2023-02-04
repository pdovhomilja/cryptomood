import React from "react";

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import Ticker from "../components/Ticker";

const Home = () => {
  return (
    <NoSSR>
      <Layout>
        <div className="py-24 sm:py-32 lg:py-40">
          <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-2 lg:px-4">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600">
              Aktual Token price
            </h2>
            {/* TODO: header code */}

            {/* Main content - crypto cards */}
            <Ticker />

            {/* TODO: footer code */}
          </div>
        </div>
      </Layout>
    </NoSSR>
  );
};

export default Home;
