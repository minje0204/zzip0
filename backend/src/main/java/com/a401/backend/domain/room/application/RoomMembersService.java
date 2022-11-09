package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.domain.RoomMembers;

public interface RoomMembersService {
    boolean isInRoom(Member member);

    void enterRoom(Room room, Member member, String sessionId);

    void exitRoom(Room room, Member member);

    int getMemberCount(Room room);

    RoomMembers findRoomMembersbySessionId(String sessionId);

}
