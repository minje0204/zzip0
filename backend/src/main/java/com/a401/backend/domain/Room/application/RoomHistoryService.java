package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;

public interface RoomHistoryService {

    boolean leaveLog(Room room, Member member, RoomAction roomAction);
}
