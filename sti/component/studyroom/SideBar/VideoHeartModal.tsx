// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLikeBackground } from '../../../lib/api/background';

interface Test {}

const VideoHeartModal: Test = () => {
  const [datas, setDatas] = useState([]);

  const getLikeVideo = () => {
    getLikeBackground().then((res) => {
      console.log(res.data);
      setDatas(res.data);
    });
  };

  const heartList = datas.map((v) => (
    <div id="heartConentContainer" key={v.bgId}>
      <div>
        <img src={`https://picsum.photos/id/${v.thumbnailUrl}/200/100`} />
      </div>
      <div id="heartInfoContainer">
        <div> {v.bgTitle}</div>
        <div> {v.bgCategory}</div>
      </div>
    </div>
  ));

  useEffect(() => {
    getLikeVideo();
  }, []);

  return (
    <HeartModalContainer>
      <div id="heartbox">
        <HeartInfoContainer>{heartList}</HeartInfoContainer>
      </div>
    </HeartModalContainer>
  );
};

const HeartModalContainer = styled.div`
  overflow-y: scroll;
  height: 350px;

  #heartbox {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    overflow-y: scroll;
  }
  #heartbox::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  #heartbox::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #e9e9e9; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  #heartbox::-webkit-scrollbar-track {
    background: white; /*스크롤바 뒷 배경 색상*/
  }
  #heartConentContainer {
    display: flex;
    justify-content: center;
  }
  #heartInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    margin-left: 20px;
  }
`;

const HeartInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default VideoHeartModal;
