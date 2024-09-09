import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

function UniswapPoolData({ POOL_ADDRESS, Token0, Token1 }) {
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

    const fetchPrice = async (provider) => {
        try {
            const token0Contract = new ethers.Contract(Token0, ERC20_ABI, provider);
            const token1Contract = new ethers.Contract(Token1, ERC20_ABI, provider);

            // Get the reserves of Token0 and Token1
            const token0Balance = await token0Contract.balanceOf(POOL_ADDRESS);
            const token1Balance = await token1Contract.balanceOf(POOL_ADDRESS);

            console.log("Token0 Balance:", token0Balance.toString());
            console.log("Token1 Balance:", token1Balance.toString());

            const token0Decimals = await token0Contract.decimals();
            const token1Decimals = await token1Contract.decimals();

            // Convert to human-readable format
            const token0AmountFormatted = ethers.formatUnits(token0Balance, token0Decimals);
            const token1AmountFormatted = ethers.formatUnits(token1Balance, token1Decimals);

            console.log("Formatted Token0 Amount:", token0AmountFormatted);
            console.log("Formatted Token1 Amount:", token1AmountFormatted);
            setToken0Amount(token0AmountFormatted);
            setToken1Amount(token1AmountFormatted);

        } catch (error) {
            console.error("Error fetching price: ", error);
        }
    };

    useEffect(() => {
        let intervalId;

        const initFetch = async () => {
            if (walletConnected) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await fetchPrice(provider);

                // Poll for updates every 10 seconds (adjust as needed)
                intervalId = setInterval(() => fetchPrice(provider), 10000);
            }
        };

        initFetch();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [walletConnected]);

    return (
        <div>
            {!walletConnected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    {token0Amount && token1Amount ? (
                        <p>
                            {Token0} Amount: {token0Amount} <br />
                            {Token1} Amount: {token1Amount}
                        </p>
                    ) : (
                        <p>Loading price...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UniswapPoolData;
