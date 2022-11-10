package com.a401.backend.domain.socket.dto;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.model.RoomAction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocketMessage {

    private RoomAction roomAction; // 룸 액션
    private String roomId; // 방 url (uuid 값)

    private String sender; // 메시지 보낸사람

    private Background bg;

    @Override
    public String toString() {
        return "SocketMessage{" +
                "roomAction=" + roomAction +
                ", roomId='" + roomId + '\'' +
                ", sender='" + sender + '\'' +
                ", bg=" + bg +
                '}';
    }
}
