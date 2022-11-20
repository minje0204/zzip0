// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// css
import widget from '../../../../styles/Widget.module.css';
import chat from '../../../../styles/Chat.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
// recoil
import { useRecoilState } from 'recoil';
import { ChatModalOpen } from '../../../../lib/recoil/Modal';
import { chatState } from '../../../../lib/recoil/chat';
import { userState } from '../../../../lib/recoil/member';

// component
import ChatListItems from './ChatListItems';

interface Test {}

const ChatWidgetView: Test = ({ socketConnection }) => {
  const [datas, setDatas] = useRecoilState(chatState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const router = useRouter();
  const roomUrl = router.query;
  const nodeRef = useRef(null);
  const [chatOpen, setChatOpen] = useRecoilState(ChatModalOpen);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [chats, setChats] = useRecoilState(chatState);
  useEffect(() => {}, []);

  const addContent = (e) => {
    if (e.key === 'Enter') {
      socketConnection.publish({
        destination: '/app/room',
        body: JSON.stringify({
          sender: userInfo.data.memberName,
          roomId: roomUrl['roomUrl'],
          roomAction: 'CHAT',
          message: e.target.value,
          skipContentLengthHeader: true
        }),
        skipContentLengthHeader: true
      });
      setText('');
    }
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      {chatOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 350, y: 200 }}>
          <div ref={nodeRef} className={(widget.widget, chat.widget)}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/chat.png`}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '5px'
                  }}
                ></img>
                <b>Chat</b>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button
                  id={widget.widgetCloseBtn}
                  onClick={() => {
                    setChatOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div
              className={(widget.widgetContent, chat.WidgetContent)}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <ChatContentsContainer>
                {chats.map((chat, index) => (
                  <ChatListItems key={index} data={chat} />
                ))}
              </ChatContentsContainer>
              <ChatInputContainer>
                <TextField
                  variant="standard"
                  value={text}
                  placeholder="내용을 입력하세요"
                  autoFocus
                  onChange={onChangeText}
                  onKeyDown={addContent}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  sx={{ width: '300px', height: '80px', paddingTop: 1 }}
                  inputProps={{
                    style: { fontSize: 16, fontFamily: 'CircularStd' }
                  }}
                />
              </ChatInputContainer>
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

const ChatInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
`;
const ChatContentsContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  overflow: scroll;
  margin: 5px 0px;
  height: 100%;
  width: 100%;
`;

export default ChatWidgetView;
