// @ts-nocheck
import React, { useState, useEffect } from 'react';
// component
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { searchCateState } from '../../lib/recoil/home'
// css
import home from '../../styles/Home.module.css';
import IconButton from '@mui/material/IconButton';

interface Test {}

const HomeCateSelect: Test = ({}) => {
  const themeNameList = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'pets',
    'lofi'
  ];
  const [selectedTheme, setSelectedTheme] = useState('christmas');
  const [cate, setCate] = useRecoilState(searchCateState)

  useEffect(() => {console.log('select', cate)}, [cate])
  return (
    <HomeCagteStyle>
      <HomeCateContainer>
        {themeNameList.map((cate) => (
          <IconButton
            aria-label="fingerprint"
            color="success"
            onClick={() => {
              setCate(cate);
            }}
            sx={{
              border: 1,
              borderColor: '#e9e9e9',
              padding: 1.7,
              borderRadius: 8,
              margin: 0.5,
              height: 40,
              width: 130,
            }}
            color="inherit"
          >
            <img
              src={`/${cate}.png`}
              style={{ width: '15px', marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{cate}</span>
          </IconButton>
        ))}
      </HomeCateContainer>
    </HomeCagteStyle>
  );
};

const HomeCateContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomeCagteStyle = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
`;

export default HomeCateSelect;
