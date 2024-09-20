import { ethers } from 'ethers';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';


const POOL_ADDRESS = "0x4CcD010148379ea531D6C587CfDd60180196F9b1"; // Your Uniswap V3 pool address

const provider = new ethers.providers.Web3Provider(window.ethereum); // Use the browser's Ethereum provider

const getPoolData = async () => {
    try {
        const poolContract = new ethers.Contract(POOL_ADDRESS, IUniswapV3PoolABI, provider);

        // Fetch the fee tier, liquidity, and price data
        const fee = await poolContract.fee(); // This is the fixed fee for the pool (e.g., 0.3%)
        const slot0 = await poolContract.slot0(); // Slot0 contains current price and other data
        const liquidity = await poolContract.liquidity(); // Current liquidity in the pool

        console.log(`Fee: ${fee / 10000}%`); // Display the fee tier (0.05%, 0.3%, etc.)
        console.log(`Current price: ${slot0.sqrtPriceX96.toString()}`);
        console.log(`Liquidity: ${liquidity.toString()}`);
        
        // You can now calculate the effective fee based on WETH amount and price impact
        return {
            fee,
            price: slot0.sqrtPriceX96,
            liquidity
        };
    } catch (error) {
        console.error('Error fetching pool data:', error);
    }
};

getPoolData();
