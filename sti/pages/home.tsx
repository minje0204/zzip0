// @ts-nocheck
import React from 'react';
import Navbar from '../component/Navbar';
import HomeView from '../component/home/HomeView';

interface Test {}

const Home: Test = () => {
  return (
    <div>
      <Navbar />
      <HomeView />
    </div>
  );
};

export default Home;
