// @ts-nocheck

import React from 'react';
import ChatListItems from './ChatListItems';

interface Test {}

const ChatList: Test = ({ datas }) => {
  return (
    <div>
      {datas.map((data) => (
        <ChatListItems data={data} />
      ))}
    </div>
  );
};

export default ChatList;
