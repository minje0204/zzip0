// @ts-nocheck
import React, { useEffect } from 'react';
// mui
import styled from 'styled-components';
// component
import OnlineItem from './OnlineItem';
import { useRecoilState } from 'recoil';
import { myRoomPeopleState, myroomState } from '../../../lib/recoil/room';

interface Test {}

const OnlineView: Test = () => {
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);

  useEffect(() => {
    console.log(onlines);
    console.log('onlineview roominfo', roomInfo.memberList);
    if (Array.isArray(roomInfo.memberList) && roomInfo.memberList.length > 0) {
      setOnlines((onlines) => roomInfo.memberList);
    }
  }, [roomInfo]);

  useEffect(() => {
    console.log(onlines);
  }, [onlines]);

  return (
    <OnlineViewContainer>
      <div>
        참가자 목록
        <br />
        {Array.isArray(onlines) && onlines.length > 0 ? (
          <>
            {console.log('ddddddddddd', onlines)}
            {onlines.map((data) => (
              <OnlineItem key={data} data={data} />
            ))}
          </>
        ) : null}
      </div>
      <div></div>
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
