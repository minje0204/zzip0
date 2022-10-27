// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import TimeLapse from './TimeLapse';
import TodayMy from './TodayMy';
import TopTimeLapse from './TopTimeLapse';
import SelectTheme from './SelectTheme';
import Videos from './Videos';


interface Test {}

const HomeView: Test = () => {
  return (
    <div>
      <Navbar />
      <HomeContainer>
        <TimeLapse />
        <TodayMy />
        <TopTimeLapse />
        <SelectTheme />
        <Videos />
      </HomeContainer>
    </div>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default HomeView;
