// @ts-nocheck

import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="navbar">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ZZip_0
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button variant="text" color="inherit" sx={{ mr: 1 }}>
              Join Study
            </Button>
            <Button variant="text" color="inherit" sx={{ mr: 1 }}>
              Create Study
            </Button>
            <Button variant="text" color="inherit" disabled sx={{ mr: 1 }}>
              Pricing
            </Button>
            <Button variant="text" color="inherit" sx={{ mr: 1 }}>
              Report
            </Button>
            <Button
              variant="contained"
              color="darkButton"
              sx={{ color: 'primary.main' }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
