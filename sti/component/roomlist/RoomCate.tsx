// @ts-nocheck

import { Tooltip, IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface Test {}

const RoomCate: Test = ({ themeName }) => {
  const cateList = (
    <Tooltip
      title={<Typography fontSize={20}>{themeName}</Typography>}
      followCursor
    >
      <IconButton
        variant="outlined"
        sx={{
          border: 1,
          borderColor: '#e9e9e9',
          padding: 1.7,
          borderRadius: 4,
          margin: 0.5
        }}
        size="medium"
      >
        <img src={`/${themeName}.png`} style={{ width: '30px' }} />
      </IconButton>
    </Tooltip>
  );
  return <CateContainer>{cateList}</CateContainer>;
};

export default RoomCate;

const CateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;
