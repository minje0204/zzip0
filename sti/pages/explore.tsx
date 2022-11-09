// @ts-nocheck

import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import Navbar from '../component/Navbar';
import TodayMy from '../component/home/TodayMy';
import HomeCateSelect from '../component/home/HomeCateSelect';
import HomeVideoList from '../component/home/HomeVideoList';

const Explore: NextPage = () => {
  return (
    <div>
      <main>
        <Navbar />
        <HomeContainer>
          <HomeCateSelect />
          <HomeVideoList />
        </HomeContainer>
      </main>
    </div>
  );
};

export default Explore;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
