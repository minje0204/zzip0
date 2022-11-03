// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
//mui, css
import Skeleton from '@mui/material/Skeleton';
import home from '../../styles/Home.module.css';
//recoil
import { searchCateState } from '../../lib/recoil/home';
import { useRecoilState } from 'recoil';
//component
import CateInfo from './CateInfo';
interface Test {}

const HomeVideoList: Test = ({ selectedTheme }) => {
  const vidList = [
    'CrazyPond',
    '크리스마스테마',
    'ASMR',
    '베스킨라빈스 asmr',
    '장작타는소리',
    '개소리',
    '소소리',

  ];
  const [selectedVid, setSelectedVid] = useState('');
  const [cate, setCate] = useRecoilState(searchCateState);
  const [upCate, setUpCate] = useState('');
  const setCapitalize = (cate) => {setUpCate(cate.charAt(0).toUpperCase() + cate.slice(1))}
  useEffect(()=> { setCapitalize(cate)}, [cate])

  return (
    <div className={home.homecontainer}>
      <CateInfoContainer>
        <CateInfo cate={upCate} />
      </CateInfoContainer>
      <HomeVideoListContainer>
        {vidList.map((vidName) => (
          <>
            <div
              onClick={() => {
                setSelectedVid(vidName);
              }}
              style={{ height: '300px', borderRadius: '10px' }}
            >
              <div id="cateImgContainer">
                <img src={'https://source.unsplash.com/category/3d-renders/1600x900'} id="catePic" />
              </div>
              <div id="cateInfoContainer">
                <div id="home-cate-font">{upCate}</div>
                <div id="home-name-font">{vidName}</div>
              </div>
            </div>
          </>
        ))}
      </HomeVideoListContainer>
    </div>
  );
};

const HomeVideoListContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 400px 400px;
  row-gap: 20px;
  column-gap: 20px;
  margin: 20px 50px;

  #catePic {
    border-radius: 10px;
    widht: 100%;
    object-fit: cover;
  }
  #cateImgContainer {
    height: 75%;
    background-color: black;
    overflow: hidden;
    border-radius: 10px;
  }
  #cateInfoContainer {
    display: flex;
    flex-direction: column;
    height: 25%;
    margin-top: 10px;
  }
  #home-cate-font{
    font-size: 22px;

  }
  #home-name-font{
    font-size: 16px;
    
  }
`;
const CateInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export default HomeVideoList;
