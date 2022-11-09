// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Login from '../pages/signin';
import styled from '@emotion/styled';
import router from 'next/router';
// mui
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
//recoil
import { useRecoilState } from 'recoil';
import { LoginModalOpen } from '../lib/recoil/Modal';
import { userState } from '../lib/recoil/member';
// cookie
import { Cookies, useCookies } from 'react-cookie';
//api
import { getUser } from '../lib/api/member';

{
}

// modal style
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
  borderColor: 'transparent'
};

function Navbar() {
  const [open, setOpen] = useRecoilState(LoginModalOpen);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [loginText, setLoginText] = useState('SignIn');
  const [isLogin, setIsLogin] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cookies = new Cookies();
  const [, setCookie, removeCookie] = useCookies(['accessToken']);

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res.data);
    });
  };

  const handleClick = () => {
    if (isLogin) {
      removeCookie('accessToken');
      router.push('/');
      setIsLogin(false);
      setLoginText('Login');
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    if (cookies.get('accessToken')) {
      setIsLogin(true);
      setLoginText('Logout');
    } else {
      setIsLogin(false);
      setLoginText('Login');
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="navbar">
        <Toolbar>
          <Link href={`/`}>
            <Button
              variant="text"
              color="inherit"
              sx={{ mr: 1, width: '300px' }}
              size="large"
            >
              <b>ZZip_0</b>
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href={`/`}>
              <Button
                variant="text"
                color="inherit"
                sx={{ mr: 1, width: '80px' }}
              >
                Home
              </Button>
            </Link>

            {/* Roomlist */}
            {cookies.get('accessToken') ? (
              <Link href={`/roomlist`}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ mr: 1, width: '80px' }}
                >
                  Study
                </Button>
              </Link>
            ) : (
              <Button
                variant="text"
                color="inherit"
                sx={{ mr: 1, width: '80px' }}
                onClick={handleOpen}
              >
                Study
              </Button>
            )}

            <Link href={`/payment`}>
              <Button
                variant="text"
                color="inherit"
                disabled
                sx={{ mr: 1, width: '80px' }}
              >
                Price
              </Button>
            </Link>
            {isLogin ? (
              <Link href={`/report/${userInfo.providerId}`}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ mr: 1, width: '80px' }}
                >
                  My
                </Button>
              </Link>
            ) : null}

            {/* Login Logout */}
            <Button
              variant="contained"
              color="darkButton"
              onClick={handleClick}
              sx={{
                mr: 1,
                width: '85px',
                color: 'primary.main',
                borderRadius: 5
              }}
            >
              {loginText}
            </Button>

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

const NavbarContainer = styled.div``;
export default Navbar;
