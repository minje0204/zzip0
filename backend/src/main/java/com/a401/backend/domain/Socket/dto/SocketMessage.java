package com.a401.backend.domain.Socket.dto;

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

    // TODO: 2022-10-28 @CurrentUser로 보낸 사람 받아올 수 있는지 파악
    private String sender; // 메시지 보낸사람 
}
