// @ts-nocheck
import { useState, useRef } from 'react';
// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
// component
import VideoHeart from './VideoHeart';
// recoil
import { useRecoilState } from 'recoil';
import { volumeState, backgroundBEState } from '../../../lib/recoil/background';
// lib
import AudioPlayer from 'react-h5-audio-player';

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
  const [volume, setVolume] = useRecoilState(volumeState);
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
  };

  const player = useRef<any>();

  return (
    <>
      <audio controls src={`${backgroundBE.bgmUrl}`}>
        웹브라우저가 audio태그를 지원하지 않을 때 표시할 문구
      </audio>
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
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof volume === 'number' ? volume : 0}
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
