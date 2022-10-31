// @ts-nocheck

import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="navbar">
        <Toolbar>
          <Link href={`/`}>
            <Button variant="text" color="inherit" sx={{ mr: 1 }} size="large">
              <b>ZZip_0</b>
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href={`/`}>
              <Button variant="text" color="inherit" sx={{ mr: 1 }}>
                Home
              </Button>
            </Link>
            <Link href={`/roomlist`}>
              <Button variant="text" color="inherit" sx={{ mr: 1 }}>
                Join Study
              </Button>
            </Link>
            <Link href={`/payment`}>
              <Button variant="text" color="inherit" disabled sx={{ mr: 1 }}>
                Pricing
              </Button>
            </Link>
            <Link href={`/report`}>
              <Button variant="text" color="inherit" sx={{ mr: 1 }}>
                Report
              </Button>
            </Link>
            <Link href={`/signin`}>
              <Button
                variant="contained"
                color="darkButton"
                sx={{ color: 'primary.main' }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
