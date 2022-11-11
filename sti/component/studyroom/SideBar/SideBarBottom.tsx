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
  position: absolute;
  display: flex;
  height: 50px;
  width: 90%;
  justify-content: space-between;
  bottom: 0px;
  left: 0px;
  margin: 20px;
`;

export default SideBarBottom;
