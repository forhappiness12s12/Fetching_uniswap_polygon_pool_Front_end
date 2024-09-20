import React from 'react';
import UniswapPoolData from './Components/UniswapPoolData';
import UniswapPoolData1 from './Components/UniswapPoolData1';
import UniswapPoolDatafunc from './Components/UniswapPoolDatafunc';
import Uniswapgetpool from './Components/uniswap_get_pool';

const POOL_ADDRESS = "0x4CcD010148379ea531D6C587CfDd60180196F9b1"; // Example pool address this is Polygon network
const WETH_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // Example WETH address
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // Example USDT address

const pun_address="0x11A6713B702817DB0Aa0964D1AfEe4E641319732"; // this is Ethereum network.
const cake_address="0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898";
const usdc_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

//On Arbitrum network
// const usdc_token="0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
// const usdt_token="0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
const usdc_token="0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f";//WBTC
const usdt_token="0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
const fee=3000;

// const usdc_token="0x99C67FFF21329c3B0f6922b7Df00bAB8D96325c9";//WBTC on arbitrum sepolia
// const usdt_token="0x30fA2FbE15c1EaDfbEF28C188b7B8dbd3c1Ff2eB";//test usdt -google input- how to find usdt adddress on arbitrum sepolia network
// const fee=3000;


function App() {
  return (
    <div className="App">
      {/* <div>
      <UniswapPoolDatafunc POOL_ADDRESS={POOL_ADDRESS} Token0={WETH_ADDRESS} Token1={USDT_ADDRESS}  />
      </div>
      <div>
      <UniswapPoolDatafunc POOL_ADDRESS={pun_address} Token0={cake_address} Token1={usdc_address}  />
      </div>
      <div>
        <UniswapPoolData1/>
      </div> */}
      <div>
        <Uniswapgetpool Token0={usdc_token} Token1={usdt_token} Fee={fee}  />
      </div>


      {/* <div>
        <Pooldata/>
      </div> */}
    </div>
  );
}

export default App;
