// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// mui
import Popover from '@mui/material/Popover';
// component
import OnlineItem from './OnlineItem';
import OnlineListView from './OnlineListView';
import { useRecoilState } from 'recoil';
import { myRoomPeopleState, myroomState } from '../../../lib/recoil/room';

interface Test {}

const OnlineView: Test = () => {
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    console.log(onlines);
    console.log('onlineview roominfo', roomInfo.memberList);
    if (Array.isArray(roomInfo.memberList) && roomInfo.memberList.length > 0) {
      setOnlines((onlines) => roomInfo.memberList);
    }
  }, [roomInfo]);

  useEffect(() => {}, [onlines]);

  return (
    <OnlineViewContainer>
      <div>
        참가자 목록
        <br />
        {Array.isArray(onlines) && onlines.length > 0 ? (
          <div onClick={handleClick}>
            {onlines.map((data) => (
              <OnlineItem key={data} data={data} />
            ))}
          </div>
        ) : null}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
      >
        <OnlineListView datas={onlines} />
      </Popover>

      <div></div>
    </OnlineViewContainer>
  );
};

const OnlineViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 30px;
`;

export default OnlineView;
