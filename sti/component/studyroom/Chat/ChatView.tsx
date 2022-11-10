// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';

interface Test {}

const ChatView: Test = () => {
  const [datas, setDatas] = useState([1, 2, 3, 4]);

  const addContent = (e) => {
    if (e.key === 'Enter') {
      setDatas([...datas, e.target.value]);
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
