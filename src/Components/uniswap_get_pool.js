import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contratabi from './abi/contractabi.json'
import sepoliacontractabi from './abi/sepoliacontractabi.json'

// UniswapV3 Factory ABI (simplified for getPool function)
// const UNISWAP_V3_FACTORY_ABI = contratabi;
const UNISWAP_V3_FACTORY_ABI = sepoliacontractabi;

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

const UNISWAP_V3_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // Uniswap V3 Factory on Arbitrum
// const UNISWAP_V3_FACTORY_ADDRESS = "0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e"; // Uniswap V3 Factory on Arbitrum Sepolia


function Uniswap_getpool({ Token0, Token1, Fee }) {
    const [poolAddress, setPoolAddress] = useState(null);
    const [token0Amount, setToken0Amount] = useState(null);
    const [token1Amount, setToken1Amount] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request accounts if not connected
            setWalletConnected(true);
        } catch (error) {
            console.error("Error connecting wallet: ", error);
        }
    };

    const fetchPoolAddress = async (provider) => {
        try {
            const uniswapV3FactoryContract = new ethers.Contract(UNISWAP_V3_FACTORY_ADDRESS, UNISWAP_V3_FACTORY_ABI, provider);
            const pool = await uniswapV3FactoryContract.getPool(Token0, Token1, Fee);
            console.log("Pool Address:", pool);
            setPoolAddress(pool);
        } catch (error) {
            console.error("Error fetching pool address: ", error);
        }
    };

    

    useEffect(() => {
        let intervalId;

        const initFetch = async () => {
            if (walletConnected) {
                const provider = new ethers.BrowserProvider(window.ethereum);

                // Fetch the pool address first
                await fetchPoolAddress(provider);
            }
        };

        initFetch();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [walletConnected, poolAddress]);

    return (
        <div>
            {!walletConnected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    {poolAddress ? (
                        <div>
                            <p>Pool Address: {poolAddress}</p>
                            {token0Amount && token1Amount ? (
                                <p>
                                    {Token0} Amount: {token0Amount} <br />
                                    {Token1} Amount: {token1Amount}
                                </p>
                            ) : (
                                <p>Loading price...</p>
                            )}
                        </div>
                    ) : (
                        <p>Loading pool address...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Uniswap_getpool;
