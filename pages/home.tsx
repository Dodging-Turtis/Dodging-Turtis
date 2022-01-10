import { useContext } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import SmartContract from '../truffle/abis/Turtis.json';
import Navbar from '../components/navbar';
import Body from '../components/body';
import Footer from '../components/footer';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default Landing;
