// @ts-nocheck

import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import bac from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';

interface Test {}

const Background: Test = () => {
  return (
    <>
      <VideoPlayer>
        <PlayerContainer>
          <PlayerContainer2>
            <iframe
              src="https://www.youtube.com/embed/kVIKJb0JJz8?
              autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&
              disablekb=1&playsinline=1&showinfo=0&iv_load_policy=3&enablejsapi=1s
              &allowfullscreen=1&frameborder=0"
              height="100%"
              width="100%"
              allow="autoplay"
            ></iframe>
          </PlayerContainer2>
        </PlayerContainer>
      </VideoPlayer>
    </>
  );
};

const VideoPlayer = styled.div`
  position: fixed;
  z-index: -1;
  top: -12%;
  left: 0;
  overflow: hidden;
  user-select: text;
  width: 100vw;
  height: 100vh;
`;

const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-aspect-ratio: 16 / 9;
`;

const PlayerContainer2 = styled.div`
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  @media (max-aspect-ratio: 16 / 9) {
    width: 177.78vh !important;
    height: 120% !important;
  }
`;

export default Background;
