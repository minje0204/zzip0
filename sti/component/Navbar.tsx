// @ts-nocheck

import * as React from 'react';

import Link from 'next/link';
import Login from '../pages/signin';

// mui
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { border } from '@mui/system';
import { NoEncryption } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderColor: 'transparent',
};

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <Button onClick={handleOpen}>SignIn</Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Login />
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
