import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../src/firebase/firebaseClient'; // Corrected import path for firebaseClient
import { signOut } from 'firebase/auth'; // Import the signOut function from firebase/auth
import BlinkingText from './BlinkingText';
import '../styles/background.css';
import buyWithMetaMask from './buyWithMetaMask'; // Import the buyWithMetaMask function
import { initWeb3Auth, buyWithWeb3Auth } from './buyWithWeb3Auth'; // Import the Web3Auth functions

const BuyNFT = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [nftPrice, setNftPrice] = useState(0.008); // Set the NFT price to 0.008 ETH for the development stage
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserName(user.displayName);
      } else {
        router.push('/signin');
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    initWeb3Auth();
  }, []);

  useEffect(() => {
    const { status } = router.query;
    if (status === 'success') {
      setMessage('Purchase Success');
    } else if (status === 'failed') {
      setMessage('Purchase Failed');
    }
  }, [router.query]);

  const handleMetaMaskPayment = async () => {
    const result = await buyWithMetaMask(nftPrice);
    setMessage(result.message);
  };

  const handleWeb3AuthPayment = async () => {
    const result = await buyWithWeb3Auth(nftPrice);
    setMessage(result.message);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="background">
      <div className="bubble"></div>
      <div className="h-screen flex flex-col items-center justify-center bg-transparent">
        <BlinkingText />
        <div className="mt-8 p-4 bg-white rounded shadow-md flex flex-col items-center">
          <h4 className="text-2xl font-bold">Hello, {userName}</h4>
          <h3 className="text-xl">NFT Price: {nftPrice} ETH</h3>

          <button
            onClick={handleMetaMaskPayment}
            className="common-btn bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 hover:from-green-700 hover:via-yellow-700 hover:to-orange-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4 w-full"
          >
            Pay with MetaMask
          </button>

          <button
            onClick={handleWeb3AuthPayment}
            className="common-btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4 w-full"
          >
            Pay with Web3Auth
          </button>

          <button
            onClick={handleLogout}
            className="common-btn bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4 w-full"
          >
            Logout
          </button>

          {message && <p className="mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyNFT;
