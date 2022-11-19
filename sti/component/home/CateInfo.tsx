// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface Test {}

const CateInfo: Test = ({ cate }) => {
  const [newStr, setNewStr] = useState('');

  const changeStr = (preStr) => {
    let firstChar = preStr.charAt(0);
    let others = preStr.slice(1);
    setNewStr(firstChar.toUpperCase() + others.toLowerCase());
  };

  useEffect(() => {
    changeStr(cate);
  }, [cate]);
  return (
    <InfoContainer>
      <img src={`/${cate.toLowerCase()}.png`} id="cate-info-img" />
      <span id="cate-font">{newStr}</span>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direstion: row;
  #cate-info-img {
    width: 80px;
    margin-right: 40px;
  }
  #cate-font {
    font-size: 50px;
    width: 170px;
    text-align: center;
  }
`;

export default CateInfo;
