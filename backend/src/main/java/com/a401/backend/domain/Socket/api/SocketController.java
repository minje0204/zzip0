package com.a401.backend.domain.Socket.api;

import com.a401.backend.domain.Socket.dto.SocketMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SocketController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/room")
    public void message(SocketMessage message) {
        String roomUrl = message.getRoomId();
        switch (message.getRoomAction()) {
            /***
             * 방 입장의 경우 처리할 소켓 로직
             * 1. 프론트에서 subscribe 달기
             * 2. 프론트에서 publish 보내기
             case OPEN:
             break;
             ***/
            case ENTER:
                // TODO: 2022-10-28 현재 방에 있는 사람들에게 내가 들어왔다는 사실을 알림 
                
                break;
            case EXIT:
                // TODO: 2022-10-28 현재 방에 있는 사람들에게 내가 나갔다는 사실을 알림 
                break;
            /***
             * 강퇴하기 보류
             case KICKOUT:
             break;
             ***/
            case SESSION_CREATE:
                // TODO: 2022-10-28 현재 방에 있는 사람들에게 생성된 SessionId 값을 알려줘야함
                break;
            /***
             * 세션 입장과 퇴장에 대해서는 알 필요가 없다.
             case SESSION_ENTER:
             break;
             case SESSION_EXIT:
             break;
             ***/

            // queue로 보내면 될 듯
            case CAMERA_ON:
                // TODO: 2022-10-28 타임랩스가 시작됨을 알림
                break;
            case CAMERA_ING:
                // TODO: 2022-10-28 타임랩스가 진행중임을 알림 
                break;
            case CAMERA_OFF:
                // TODO: 2022-10-28 타임랩스가 종료됨을 알림 
                break;
        }
        messagingTemplate.convertAndSend("/topic/room" + roomUrl, message);
    }
}
