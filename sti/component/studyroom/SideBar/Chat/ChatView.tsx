// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';

import { useRouter } from 'next/router';

//component
import { useRecoilState } from 'recoil';

//recoil
import { userState } from '../../../../lib/recoil/member';
import { chatState } from '../../../../lib/recoil/chat';

interface Test {}

const ChatView: Test = ({ socketConnection }) => {
  const [datas, setDatas] = useRecoilState(chatState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const router = useRouter();
  const roomUrl = router.query;

  const addContent = (e) => {
    if (e.key === 'Enter') {
      // setDatas([...datas, e.target.value]);

      socketConnection.publish({
        destination: '/app/room',
        body: JSON.stringify({
          sender: userInfo.data.membername,
          roomId: roomUrl['roomUrl'],
          roomAction: 'CHAT',
          message: e.target.value,
          skipContentLengthHeader: true
        }),
        skipContentLengthHeader: true
      });
    }
  };
  return (
    <ChatViewContainer>
      <ChatList datas={datas} />
      <input onKeyDown={addContent} />
    </ChatViewContainer>
  );
};

const ChatViewContainer = styled.div`
  width: 500px;
  height: 500px;
`;

export default ChatView;
