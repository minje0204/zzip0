package com.a401.backend.domain.socket.dto;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.model.RoomAction;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SocketMessage {

    private RoomAction roomAction; // 룸 액션
    private String roomId; // 방 url (uuid 값)

    private String sender; // 메시지 보낸사람

    private Background bg;
    private String message;

}
