// @ts-nocheck
import React from 'react';
// component
import styled from 'styled-components';
// css
import IconButton from '@mui/material/IconButton';
//recoil
import { atom, selector, useRecoilState } from 'recoil';
import { selectedCateState } from '../../lib/recoil/home';
//api
import { getCateBackground } from '../../lib/api/background';

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

  const [homeList, setHomeList] = useRecoilState(selectedCateState);

  const chooseCate = (selectedCate) => {
    getCateBackground(selectedCate.toUpperCase()).then((res) => {
      setHomeList(res.data);
      console.log(res.data);
    });
  };

  return (
    <HomeCagteStyle>
      <HomeCateContainer>
        {themeNameList.map((cate) => (
          <IconButton
            key={cate}
            aria-label="fingerprint"
            color="success"
            sx={{
              border: 1,
              borderColor: '#e9e9e9',
              padding: 1.7,
              borderRadius: 8,
              margin: 0.5,
              height: 40,
              width: 130
            }}
            onClick={() => chooseCate(cate)}
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
