// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// component
import VideoHeart from './VideoHeart';
// recoil
import { useRecoilState } from 'recoil';
import { volumeState, backgroundBEState } from '../../../lib/recoil/background';
// lib

const Input = styled(MuiInput)`
  width: 42px;
`;

const VolumeContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 155px;
  width: 100%;
  background-color: rgba(245, 245, 245);
`;

const VolumTopContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const VolumTypoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 0px 0px 10px 17px;
`;

const HeartBox = styled(Box)`
  display: flex;
  width: 40%;
  padding: 0px 0px 10px 17px;
`;

const SliderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function InputSlider() {
  const [value, setValue] = useState(30);
  const [isPlay, setIsPlay] = useState(false);
  const [myVolume, setMyVolume] = useRecoilState(volumeState);
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const audioRef = useRef(null);

  const handleSliderChange = (event, newValue) => {
    setMyVolume(newValue);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlay(false);
    console.log(audioRef);
  };
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlay(true);
    audioRef.current.volume = 0.3;
  };

  // 기본 시작시 play
  useEffect(() => {}, []);
  // background 바뀌었을 때 play
  useEffect(() => {
    audioRef.current.play();
    audioRef.current.volume = 0.3;
    setIsPlay(true);
  }, [backgroundBE]);
  // 볼륨 조절
  useEffect(() => {
    audioRef.current.play();
    setIsPlay(true);
    audioRef.current.volume = myVolume / 100;
  }, [myVolume]);

  return (
    <>
      <audio ref={audioRef} src={`${backgroundBE.bgmUrl}`}></audio>
      {console.log()}
      <VolumeContainer>
        <VolumTopContainer>
          <VolumTypoContainer>
            <Typography variant="subtitle2" display="block">
              <b>{backgroundBE.bgTitle}</b>
            </Typography>
            <Typography variant="caption" display="block">
              {backgroundBE.bgCategory}
            </Typography>
          </VolumTypoContainer>
          <HeartBox>
            <VideoHeart />
          </HeartBox>
        </VolumTopContainer>

        <SliderContainer>
          <Box sx={{ width: 250 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                {isPlay ? (
                  <VolumeUp onClick={handlePause} />
                ) : (
                  <VolumeOffIcon onClick={handlePlay} />
                )}
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof myVolume === 'number' ? myVolume : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  size="small"
                  color="darkButton"
                />
              </Grid>
            </Grid>
          </Box>
        </SliderContainer>
      </VolumeContainer>
    </>
  );
}
