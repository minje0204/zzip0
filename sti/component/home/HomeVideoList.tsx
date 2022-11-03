// @ts-nocheck

import React, { useState } from 'react';
import styled from '@emotion/styled';

//mui, css
import Skeleton from '@mui/material/Skeleton';

import home from '../../styles/Home.module.css';

//component
import CateInfo from './CateInfo'
interface Test {}

const HomeVideoList: Test = ({ selectedTheme }) => {
  const vidList = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'];
  const [selectedVid, setSelectedVid] = useState('');
  return (
    <div className={home.homecontainer}>
      <CateInfoContainer>
        <CateInfo cate={selectedTheme}/>
      </CateInfoContainer>
      <HomeVideoListContainer>
        {vidList.map((vidName) => (
          <>
          <div
            onClick={() => {
              setSelectedVid(vidName);
            }}
            style = {{height: '200px', borderRadius:'10px'}}
          > 
            <div id="cateImgContainer">
            <img src={'/roomsample.jpeg'} id='catePic' />
            </div>
            <div id="cateInfoContainer">
            {vidName}
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    
  }
  #cateImgContainer{
    height:80%;
  }
  #cateInfoContainer{
    height:20%;
  }
`;
const CateInfoContainer = styled.div`
  height: 200px;
`


export default HomeVideoList;
