// @ts-nocheck
import React, { useEffect } from 'react';
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

  useEffect(() => {
    console.log(onlines);
  }, []);
  return (
    <OnlineViewContainer>
      <div>
        참가자 목록
        {onlines.map((data) => (
          <span key={data}>{data}</span>
        ))}
      </div>
      <div>
        {onlines.map((data) => (
          <OnlineItem key={data} data={data} />
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
