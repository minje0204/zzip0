// @ts-nocheck

import React, { useEffect } from 'react';

interface Test {}

const ChatListItems: Test = ({ data }) => {
  useEffect(() => {}, [data]);

  return (
    <div>
      {Object.keys(data)[0] === 'ENTER' || Object.keys(data)[0] === 'EXIT' ? (
        <span>{Object.values(data)[0]}</span>
      ) : (
        <>
          {Object.keys(Object.values(data)[0])[0] == 'MYCHAT' ? (
            <span>{Object.values(Object.values(data)[0])[0]}</span>
          ) : (
            <span>
              {Object.values(Object.values(data)[0])[0][0]}:{' '}
              {Object.values(Object.values(data)[0])[0][1]}
            </span>
          )}
        </>
      )}
      <span></span>
    </div>
  );
};

export default ChatListItems;
