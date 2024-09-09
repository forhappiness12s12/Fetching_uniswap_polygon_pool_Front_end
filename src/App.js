import React from 'react';
import UniswapPoolData from './Components/UniswapPoolData';
import UniswapPoolData1 from './Components/UniswapPoolData1';
import UniswapPoolDatafunc from './Components/UniswapPoolDatafunc';

const POOL_ADDRESS = "0x4CcD010148379ea531D6C587CfDd60180196F9b1"; // Example pool address
const WETH_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // Example WETH address
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // Example USDT address

const pun_address="0x11A6713B702817DB0Aa0964D1AfEe4E641319732";
const cake_address="0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898";
const usdc_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"


function App() {
  return (
    <div className="App">
      <div>
      <UniswapPoolDatafunc POOL_ADDRESS={POOL_ADDRESS} Token0={WETH_ADDRESS} Token1={USDT_ADDRESS}  />
      </div>
      <div>
      <UniswapPoolDatafunc POOL_ADDRESS={pun_address} Token0={cake_address} Token1={usdc_address}  />
      </div>
    </div>
  );
}

export default App;
