// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components';

// recoil, 추후에 새로고침해도 유지되는 리코일 추가
import { atom, useRecoilState, useRecoilValue } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
import { backgroundState } from '../../../lib/recoil/background';
import { volumeState } from '../../../lib/recoil/background';

interface Test {}



const Background: Test = () => {
  const background = useRecoilValue(backgroundState);
  const volume = useRecoilValue(volumeState);

  // const youtubeSetting = () => {
  //   // 2. This code loads the IFrame Player API code asynchronously.
  //   var tag = document.createElement('script');
  //   tag.src = "https://www.youtube.com/iframe_api";
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  //   // 3. This function creates an <iframe> (and YouTube player)
  //   //    after the API code downloads.
  //   var player;
  //   function onYouTubeIframeAPIReady() {  
  //     console.log('onYouTubeIframeAPIReady')
  //     player = new YT.Player('player1', {
  //       events: {
  //         'onReady': onPlayerReady,
  //         'onStateChange': onPlayerStateChange
  //       }
  //     });
  //   }
  
  //   onYouTubeIframeAPIReady()
  //   // 4. The API will call this function when the video player is ready.
  //   function onPlayerReady(event) {
  //     event.target.setVolume(50);
  //     console.log('volume');
  //     event.target.playVideo();
  //   }
  
  //   // 5. The API calls this function when the player's state changes.
  //   //    The function indicates that when playing a video (state=1),
  //   //    the player should play for six seconds and then stop.
  //   var done = false;
  //   function onPlayerStateChange(event) {
  //     if (event.data == YT.PlayerState.PLAYING && !done) {
  //       setTimeout(stopVideo, 6000);
  //       done = true;
  //     }
  //   }
  //   function stopVideo() {
  //     player.stopVideo();
  //   }
  // };

  // let audio_iframe;
  // if (typeof document !== "undefined") {
  //   audio_iframe = document.querySelector('iframe');
  // }

  // const Volume = () => {
  //   audio_iframe.setVolume(0.9);
  //   console.log('volume set')
  // }
  
  useEffect(() => {
    console.log('newurl');
  }, [background]);

  // useEffect(() => {
  //   player.setVolume(volume)
  // }, [volume]);

  useEffect(() => {
    // youtubeSetting();
    // Volume();
    // console.log('youtube ready');
  }, []);



  return (
    <>
      <VideoPlayer>
        <PlayerContainer>
          <PlayerContainer2>
            <iframe
              id="player1"
              src={`${background}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&disablekb=1&playsinline=1&showinfo=0&iv_load_policy=3&enablejsapi=1s&allowfullscreen=1&frameborder=0`}
              height="100%"
              width="100%"
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
  width: 110vmax;
  height: 110vmax;
  transform: translate(-50%, -50%);
  @media (max-aspect-ratio: 16 / 9) {
    width: 177.78vh !important;
    height: 120% !important;
  }
`;

export default Background;
