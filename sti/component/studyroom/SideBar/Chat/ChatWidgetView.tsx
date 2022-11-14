// @ts-nocheck
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// css
import widget from '../../../../styles/Widget.module.css';
import noise from '../../../../styles/Noise.module.css';
// mui
import Draggable from 'react-draggable';
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
  const [chats, setChats] = useRecoilState(chatState);
  useEffect(() => {}, []);

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
    <>
      {chatOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 800, y: 400 }}>
          <div ref={nodeRef} className={(widget.widget, noise.widget)}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/audio-waves.png`}
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
                    setNoiseOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div
              className={(widget.widgetContent, noise.WidgetContent)}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              {chats.map((chat, index) => (
                <ChatListItems key={index} data={chat} />
              ))}
              <input
                onKeyDown={addContent}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

// const ChatWidgetView = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export default ChatWidgetView;
