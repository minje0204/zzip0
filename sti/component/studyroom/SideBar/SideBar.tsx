// @ts-nocheck

import * as React from 'react';
import { useRouter } from 'next/router';
// recoil
import { useRecoilState } from 'recoil';
import { userState } from '../../../lib/recoil/member';
import { myroomState } from '../../../lib/recoil/room';
import { styled, useTheme } from '@mui/material/styles';
// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// component
import SideBarMenu from './SideBarMenu';
import SideBarClock from './SideBarClock';
import Volume from './Volume';
import SideBarSuffle from './SideBarSuffle';
import SideBarBottom from './SideBarBottom';
import OnlineView from './OnlineView';

import Link from 'next/link';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function SideBar({ socketConnection }) {
  const theme = useTheme();
  const router = useRouter();
  const roomUrl = router.query;
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const disconnectSocket = () => {
    socketConnection.publish({
      destination: '/app/room',
      body: JSON.stringify({
        sender: userInfo.data.memberName,
        roomId: roomUrl['roomUrl'],
        roomAction: 'EXIT',
        skipContentLengthHeader: true
      }),
      skipContentLengthHeader: true
    });
    socketConnection.deactivate();
  };

  const SideBarUnderContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(1)
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            bgcolor: 'background.paper'
          }}
        >
          <div>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Button variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {roomInfo.roomTitle}
          </Button>
          <Link href={`/roomlist`}>
            <Button
              color="inherit"
              onClick={() => {
                disconnectSocket;
              }}
            >
              나가기
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* 사이드바 컴포넌트 */}
        <SideBarUnderContainer>
          <Divider />
          <SideBarSuffle socketConnection={socketConnection} />
          <Volume />
          <SideBarMenu />
          <OnlineView socketConnection={socketConnection} />
        </SideBarUnderContainer>
      </Drawer>
      <DrawerHeader />
    </Box>
  );
}
