// @ts-nocheck

import * as React from 'react';

//mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { atom, selector, useRecoilState } from 'recoil';
import { volumeState } from '../../../recoil/volumeState';

const Input = styled(MuiInput)`
  width: 42px;
`;

const VolumeContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 130px;
  width: 100%;
  background-color: rgba(245, 245, 245);
`;

const VolumTopContainer = styled(Box)`
  display: flex;

`;


const VolumTypoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 0px 0px 10px 17px;
`;

const HeartBox = styled(Box)`
  display: flex;
  margin-top: 15px;
  width: 40%;
  padding: 0px 0px 10px 17px;
`;


const SliderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(30);
  const [volume, setVolume] = useRecoilState(volumeState);

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <>
      <VolumeContainer>
        <VolumTopContainer>
        <VolumTypoContainer>
          <Typography variant="subtitle2" display="block" ><b>play title like Christmas p_0</b></Typography>
          <Typography variant="caption" display="block" >Share space</Typography>
        </VolumTypoContainer>
        <HeartBox>
          <IconButton
            variant="outlined"
            sx={{
              width: 38,
              height: 38,
              backgroundColor: 'white',
              border: 1,
              borderColor: '#e9e9e9',
              padding: 1.7,
              borderRadius: 2,
              margin: 0.3,
    
            }}
            size="medium"
          >
            <img src={`/heart.png`} style={{ width: '23px' }} />
          </IconButton>
          <IconButton
          variant="outlined"
          sx={{
            width: 38,
            height: 38,
            backgroundColor: 'white',
            border: 1,
            borderColor: '#e9e9e9',
            padding: 1.7,
            borderRadius: 2,
            margin: 0.3,
          }}
          size="medium"
        >
          <img src={`/playlist.png`} style={{ width: '23px' }} />
        </IconButton>
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
