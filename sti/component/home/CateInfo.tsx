// @ts-nocheck

import React from 'react';
import styled from '@emotion/styled';

interface Test { }

const CateInfo: Test = ({cate}) => {

  return (
    <InfoContainer>
      <img src={`/${cate}.png`} id="cate-info-img" />
      <span id="cate-font">{cate}</span>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direstion: row;
  #cate-info-img{
    width: 80px;
    margin-right: 40px;
  }
  #cate-font{
    font-size: 50px;
    width: 170px;
    text-align: center;
  }
`;


export default CateInfo