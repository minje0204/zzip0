// @ts-nocheck
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
// mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';

interface Test {}

const NoiseExam: Test = ({ data }) => {
  const [value, setValue] = useState(0);
  const [myVolume, setMyVolume] = useState(0);
  const audioRef = useRef(null);

  const handleSliderChange = (event, newValue) => {
    setMyVolume(newValue);
  };

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.volume = myVolume / 100;
  }, [myVolume]);

  return (
    <WhiteNoiseItemContainer>
      <audio ref={audioRef} src={`${data.noiseUrl}`}></audio>
      <Box sx={{ width: 250 }}>
        <div id="input-slider">{data.noiseTitle}</div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <VolumeUp />
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
