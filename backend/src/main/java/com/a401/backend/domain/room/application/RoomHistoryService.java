package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;
import com.a401.backend.domain.room.domain.Room;

public interface RoomHistoryService {

    void leaveLog(Room room, Member member, RoomAction roomAction);
}
