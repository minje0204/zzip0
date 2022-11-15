// @ts-nocheck

import React from 'react';

interface Test {}

const ChatListItems: Test = ({ data }) => {
  return (
    <div>
      <span>{data[0]}{data[1]}</span>
    </div>
  );
};

export default ChatListItems;
