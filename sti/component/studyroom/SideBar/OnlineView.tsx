// @ts-nocheck
import React from 'react';
// mui
import styled from 'styled-components';
// component
import OnlineItem from './OnlineItem';
import { useRecoilState } from 'recoil';
import { myRoomPeopleState } from '../../../lib/recoil/room';

interface Test {}

const OnlineView: Test = () => {
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);
  const datas = [
    'Toomy',
    'ELsa',
    '수홍',
    'ELsa',
    '수홍',
    'ELsa',
    '수홍',
    'ELsa',
    '수홍'
  ];

  return (
    <OnlineViewContainer>
      <div>
        {onlines.map((data) => (
          <OnlineItem data={data} />
        ))}
      </div>
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
