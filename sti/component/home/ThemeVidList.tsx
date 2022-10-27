// @ts-nocheck

import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Test {}

const ThemeDiv: Test = ({ selectedTheme }) => {
  const vidList = ['1', '2', '3', '1', '2', '3'];
  const [selectedVid, setSelectedVid] = useState('');
  return (
    <>
      {vidList.map((vidName) => (
        <button
          onClick={() => {
            setSelectedVid(vidName);
          }}
        >
          <Skeleton variant="rounded" width={320} height={180} />
          {vidName}
        </button>
      ))}
    </>
  );
};

export default ThemeDiv;
