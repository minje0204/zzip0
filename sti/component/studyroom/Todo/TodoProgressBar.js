import React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const TodoProgressBar = () => {
  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgress
        variant="determinate"
        value={50}
        sx={{ height: 10, margin: 0.5 }}
      />
    </Box>
  );
};

export default TodoProgressBar;
