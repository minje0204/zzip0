// @ts-nocheck

import React from 'react';
import ChatListItems from './ChatListItems';
//recoil
import { useRecoilState } from 'recoil';
import { chatDataState } from '../../../../lib/recoil/chatState';

interface Test {}

const ChatList: Test = ({ datas }) => {
  const [chatDatas, setChatDatas] = useRecoilState(chatDataState);

  return (
    <div>
      {chatDatas.map((data) => (
        <ChatListItems data={data} />
      ))}
    </div>
  );
};

export default ChatList;
