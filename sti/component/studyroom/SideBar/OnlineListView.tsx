// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components';
import OnlineListItem from './OnlineListItem';

interface Test {}

const OnlineListView: Test = ({ datas }) => {
  useEffect(() => {
    console.log('onooooooooooooo', datas);
  }, []);
  return (
    <OnlineListViewContainer>
      {datas.map((data) => (
        <OnlineListItem key={data} data={data} />
      ))}
    </OnlineListViewContainer>
  );
};

const OnlineListViewContainer = styled.div`
  width: 230px;
  height: 500px;
`;

export default OnlineListView;
