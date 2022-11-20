// @ts-nocheck
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
// mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface Test {}

const NoiseExam: Test = ({ data }) => {
  const [value, setValue] = useState(0);
  const [myVolume, setMyVolume] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [newStr, setNewStr] = useState('');

  const audioRef = useRef(null);

  const handleSliderChange = (event, newValue) => {
    setMyVolume(newValue);
  };

  const changeStr = (preStr) => {
    let firstChar = preStr.charAt(0);
    let others = preStr.slice(1);
    setNewStr(firstChar.toUpperCase() + others);
  };
  useEffect(() => {
    changeStr(data.noiseTitle);
  }, []);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.volume = myVolume / 100;
    if (myVolume == 0) setIsPlay(false);
    else setIsPlay(true);
  }, [myVolume]);

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlay(false);
  };
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlay(true);
    audioRef.current.volume = 0.3;
  };

  return (
    <WhiteNoiseItemContainer>
      <audio ref={audioRef} src={`${data.noiseUrl}`}></audio>
      <Box sx={{ width: 250 }}>
        <div id="input-slider">{newStr}</div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {isPlay ? (
              <VolumeUp onClick={handlePause} style={{ cursor: 'pointer' }} />
            ) : (
              <VolumeOffIcon
                onClick={handlePlay}
                style={{ cursor: 'pointer' }}
              />
            )}
          </Grid>
          <Grid item xs>
            <Slider
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              value={typeof myVolume === 'number' ? myVolume : 0}
              onChange={handleSliderChange}
              step={10}
              marks
              aria-labelledby="input-slider"
              size="small"
              color="darkButton"
            />
          </Grid>
        </Grid>
      </Box>
    </WhiteNoiseItemContainer>
  );
};

const WhiteNoiseItemContainer = styled.div``;

export default NoiseExam;
