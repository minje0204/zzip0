package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.domain.Room;

public interface RoomMembersService {
    boolean isInRoom(Member member);

    void enterRoom(Room room, Member member);
}
