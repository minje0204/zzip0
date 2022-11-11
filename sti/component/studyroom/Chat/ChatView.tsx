// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';
//recoil
import { useRecoilState } from 'recoil';
import { chatDataState } from '../../../../lib/recoil/chatState';

interface Test {}

const ChatView: Test = () => {
  const [datas, setDatas] = useState([]);
  const [text, setText] = useState('');
  const [chatDatas, setChatDatas] = useRecoilState(chatDataState);

  const addContent = (e) => {
    if (e.key === 'Enter') {
      setDatas([...datas, text]);
      setChatDatas([...chatDatas, text]);
      setText('');
    }
  };
  return (
    <ChatViewContainer>
      <ChatHeader></ChatHeader>
      <ChatlistContainer>
        <ChatList datas={datas} />
      </ChatlistContainer>
      <ChatInputContainer>
        <input
          id="chat-input"
          onKeyDown={addContent}
          value={text}
          placehoder="메시지를 입력하세요..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </ChatInputContainer>
    </ChatViewContainer>
  );
};

const ChatViewContainer = styled.div`
  width: 500px;
  height: 400px;
  border-radius: 100px;
`;
const ChatlistContainer = styled.div`
  width: 100%;
  height: 75%;
  overflow-y: scroll;
`;
const ChatInputContainer = styled.div`
  width: 100%;
  height: 5%;
`;
const ChatHeader = styled.div`
  width: 100%;
  height: 15%;
  background-color: #4976fd;
`;

export default ChatView;
