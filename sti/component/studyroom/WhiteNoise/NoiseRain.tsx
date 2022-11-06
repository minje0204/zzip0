// @ts-nocheck
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
// mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';

interface Test {}

const NoiseExam: Test = () => {
  const [value, setValue] = useState(30);
  const audioRef = useRef(null);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <audio ref={audioRef} src={``}></audio>
      <Box sx={{ width: 250 }}>
        <Typography id="input-slider" gutterBottom>
          Rain
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <VolumeUp />
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NoiseExam;
