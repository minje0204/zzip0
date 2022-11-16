// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components';
import OnlineListItem from './OnlineListItem';
import Typography from '@mui/material/Typography';

interface Test {}

const OnlineListView: Test = ({ datas }) => {
  useEffect(() => {
    console.log('onooooooooooooo', datas);
  }, []);
  return (
    <OnlineListViewContainer>
      <OnlineListItemTextContainer>
        <Typography variant="h6">People</Typography>
        <Typography variant="caption">
          방의 참여자를 클릭해서 공부시간 리포트를 볼 수 있습니다!
        </Typography>
      </OnlineListItemTextContainer>
      {datas.map((data) => (
        <OnlineListItem key={data} data={data} />
      ))}
    </OnlineListViewContainer>
  );
};

const OnlineListViewContainer = styled.div`
  width: 230px;
  height: 500px;
  margin: 20px;
`;

const OnlineListItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

export default OnlineListView;
