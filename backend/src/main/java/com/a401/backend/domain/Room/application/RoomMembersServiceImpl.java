package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.dao.RoomMembersRepository;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.domain.RoomMembers;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomMembersServiceImpl implements RoomMembersService {
    private final RoomMembersRepository roomMembersRepository;

    @Override
    public boolean isInRoom(Member member){
        return roomMembersRepository.existsByMember(member);
    }

    @Override
    public void enterRoom(Room room, Member member) {
        RoomMembers roomMembers = RoomMembers.builder()
                .room(room)
                .member(member)
                .build();
        roomMembersRepository.save(roomMembers);
    }
}
