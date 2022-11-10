package com.a401.backend.domain.socket.api;

import com.a401.backend.domain.socket.dto.SocketMessage;
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
        log.info(String.valueOf(message));
        String roomUrl = message.getRoomId();
        switch (message.getRoomAction()) {
            case ENTER:
                // TODO: 2022-10-28 현재 방에 있는 사람들에게 내가 들어왔다는 사실을 알림
                // 메세지를 그대로 보내고 프론트에서 처리 -> 입장한 사람 이름 추가하는 로직
                messagingTemplate.convertAndSend("/topic/room/" + roomUrl, message);
                break;
            case EXIT:
                // TODO: 2022-10-28 현재 방에 있는 사람들에게 내가 나갔다는 사실을 알림
                // 메세지를 그대로 보내고 프론트에서 처리 -> 퇴장한 사람 이름 삭제하는 로직
                messagingTemplate.convertAndSend("/topic/room/" + roomUrl, message);
                break;
            case BACKGROUND:
                messagingTemplate.convertAndSend("/topic/room/" + roomUrl, message);
                break;
        }
    }
}
