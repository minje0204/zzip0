package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.member.domain.Member;

public interface RoomMembersService {
    boolean isInRoom(Member member);

    void enterRoom(Room room, Member member);
}
