// @ts-nocheck
import React from 'react';
// mui
import styled from 'styled-components';
// component
import OnlineItem from './OnlineItem';
import ChatBtn from './Chat/ChatBtn';
import { useRecoilState } from 'recoil';
import { myRoomPeopleState } from '../../../lib/recoil/room';

interface Test {}

const OnlineView: Test = () => {
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);

  return (
    <OnlineViewContainer>
      <div>
        참가자 목록
        {onlines.map((data) => (
          <span>{data}</span>
        ))}
      </div>
      <div>
        {onlines.map((data) => (
          <OnlineItem data={data} />
        ))}
      </div>
      <ChatBtn />
    </OnlineViewContainer>
  );
};

const OnlineViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 30px;
`;

export default OnlineView;
