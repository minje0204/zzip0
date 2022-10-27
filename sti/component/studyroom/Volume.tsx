// @ts-nocheck


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { atom, selector, useRecoilState } from 'recoil';
import { volumeState } from '../../recoil/volumeState';


const Input = styled(MuiInput)` 
  width: 42px;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(30);
  const [volume, setVolume] = useRecoilState(volumeState);

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
  };


  return (
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
          />
        </Grid>

      </Grid>
    </Box>
  );
}
