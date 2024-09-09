import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const POOL_ADDRESS = "0x4CcD010148379ea531D6C587CfDd60180196F9b1"; // Your Uniswap pool address
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

function UniswapPoolData() {
    const [WETH_amount, setWETH] = useState(null);
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
            const poolContract = new ethers.Contract(POOL_ADDRESS, ERC20_ABI, provider);

            const WETH_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // WETH address on Polygon
            const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT address on Polygon

            const wethContract = new ethers.Contract(WETH_ADDRESS, ERC20_ABI, provider);
            const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, provider);

            // Get the reserves of WETH and USDT
            const wethBalance = await wethContract.balanceOf(POOL_ADDRESS);
            const usdtBalance = await usdtContract.balanceOf(POOL_ADDRESS);
            console.log("WETH Balance:", wethBalance.toString());
            console.log("USDT Balance:", usdtBalance.toString());

            const wethDecimals = await wethContract.decimals();
            const usdtDecimals = await usdtContract.decimals();

            // Convert to human-readable format
            const WETH_amountmount = ethers.formatUnits(wethBalance, wethDecimals);
            const usdtAmount = ethers.formatUnits(usdtBalance, usdtDecimals);

            console.log("Formatted WETH Amount:", WETH_amountmount);
            console.log("Formatted USDT Amount:", usdtAmount);
            setWETH(WETH_amountmount);

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
                    {WETH_amount ? (
                        <p>1 WETH = {WETH_amount} USDT</p>
                    ) : (
                        <p>Loading price...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UniswapPoolData;
