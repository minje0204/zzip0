// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Test {}

const ChatListItems: Test = ({ data }) => {
  useEffect(() => {}, [data]);

  return (
    <ChatListItemContainer>
      {Object.keys(data)[0] === 'ENTER' || Object.keys(data)[0] === 'EXIT' ? (
        <div id="info-chat">{Object.values(data)[0]}</div>
      ) : (
        <>
          {Object.keys(Object.values(data)[0])[0] == 'MYCHAT' ? (
            <div id="my-chat">{Object.values(Object.values(data)[0])[0]}</div>
          ) : (
            <span id="your-chat">
              {Object.values(Object.values(data)[0])[0][0]}:{' '}
              {Object.values(Object.values(data)[0])[0][1]}
            </span>
          )}
        </>
      )}
      <span></span>
    </ChatListItemContainer>
  );
};

const ChatListItemContainer = styled.div`
  font-size: 14px;
  font-family: NotoSans;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  #info-chat {
    text-align: center;
    color: green;
  }
  #my-chat {
    text-align: right;
  }
  #your-chat {
    text-align: left;
  }
`;

export default ChatListItems;
