// @ts-nocheck
import React, { useState } from 'react';
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
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '3'
  ];
  const [selectedVid, setSelectedVid] = useState('');
  const [cate, setCate] = useRecoilState(searchCateState);
  return (
    <div className={home.homecontainer}>
      <CateInfoContainer>
        <CateInfo cate={cate} />
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
                <img src={'/roomsample.jpeg'} id="catePic" />
              </div>
              <div id="cateInfoContainer">
                <div id="home-cate-font">{cate}</div>
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
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
