// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import OnlineItem from './OnlineItem';

interface Test {}

const SideBarBottom: Test = () => {
  return (
    <SideBarBottomContainer>
      <button>또 무슨 버튼</button>
      <button>무슨 버튼</button>
      <button>나가기</button>
    </SideBarBottomContainer>
  );
};
const SideBarBottomContainer = styled.div`
  display: flex;
  height: 50px;

  justify-content: space-between;

  margin: 20px;
`;

export default SideBarBottom;
