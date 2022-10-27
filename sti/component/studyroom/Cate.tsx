// @ts-nocheck

import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Test {}

const Cate: Test = () => {
  const cates = ['christmas', 'city', 'beach', 'cafe', 'games', 'library', 'pets', 'lofi']
  const cateList = cates.map((cate) => <Button variant="outlined">{cate}</Button>)
  return (
    <CateContainer>
      {cateList}
    </CateContainer>
  );
};

const CateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 40px 0 80px 0;
`;

export default Cate;