// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import router from 'next/router';
//mui, css
import home from '../../styles/Home.module.css';
//recoil
import { useRecoilState } from 'recoil';
import { searchCateState, selectedCateState } from '../../lib/recoil/home';
import { myroomState } from '../../lib/recoil/room';
import { roomPostAPI, canEnterAPI } from '../../lib/api/room';
//component
import CateInfo from './CateInfo';
interface Test {}

const HomeVideoList: Test = () => {
  const [cate, setCate] = useRecoilState(searchCateState);
  const [videoList, setVideoList] = useRecoilState(selectedCateState);
  const [upCate, setUpCate] = useState('');
  const [myroom, setMyRoom] = useRecoilState(myroomState);
  const setCapitalize = (cate) => {
    setUpCate(cate.charAt(0).toUpperCase() + cate.slice(1));
  };
  const roomCreateByVideo = (bgId) => {
    canEnterAPI()
      .then((res) => {
        if (res.data) {
          roomPostAPI({ backgroundId: bgId }).then((res) => {
            setMyRoom(res.data);
            router.push(`/studyroom/${res.data.roomUrl}`);
          });
        } else {
          alert('이미 방에 참여중입니다');
        }
      })
      .catch((err) => {
        console.log('err occured!');
      });
  };

  return (
    <div className={home.homecontainer}>
      <CateInfoContainer>
        <CateInfo cate={cate} />
      </CateInfoContainer>
      <HomeVideoListContainer>
        {videoList &&
          videoList.map((vid) => (
            <div key={vid.bgId} onClick={() => roomCreateByVideo(vid.bgId)}>
              <div style={{ height: '300px' }}>
                <div id="cateImgContainer">
                  <img src={`${vid.thumbnailUrl}`} className="catePic" />
                </div>
                <div id="cateInfoContainer">
                  <div id="home-cate-font">{vid.bgTitle}</div>
                  <div id="home-name-font">{vid.creator}</div>
                </div>
              </div>
            </div>
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

  .catePic {
    border-radius: 10px;
    width: 102%;
    object-fit: cover;
    cursor: pointer;
  }
  .catePic:hover {
    width: 103%;
    transition: 0.2s;
    filter: brightness(0.5);
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
  #home-cate-font {
    width: 100%;
    font-size: 18px;
    cursor: pointer;
    text-overflow: ellipsis;
  }
  #home-name-font {
    font-size: 16px;
    cursor: pointer;
  }
`;
const CateInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export default HomeVideoList;
