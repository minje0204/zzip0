// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import TimeLapse from './TimeLapse';
import TodayMy from './TodayMy';
// import TopTimeLapse from './TopTimeLapse';
import ThemeSelect from './ThemeSelect';

interface Test {}

const HomeView: Test = () => {
  return (
    <div>
      <Navbar />
      <HomeContainer>
        <TimeLapse />
        <TodayMy />
        {/* <TopTimeLapse /> */}
        <ThemeSelect />
      </HomeContainer>
    </div>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default HomeView;
