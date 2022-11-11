package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.dao.RoomMembersRepository;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.domain.RoomMembers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomMembersServiceImpl implements RoomMembersService {
    private final RoomMembersRepository roomMembersRepository;
    private final MemberRepository memberRepository;

    @Override
    public boolean isInRoom(Member member) {
        return roomMembersRepository.existsByMember(member);
    }

    @Override
    public void enterRoom(Room room, Member member, String sessionId) {
        RoomMembers roomMembers = RoomMembers.builder()
                .room(room)
                .member(member)
                .sessionId(sessionId)
                .build();
        roomMembersRepository.save(roomMembers);
    }

    @Override
    public void exitRoom(Room room, Member member) {
        RoomMembers roomMembers = roomMembersRepository.findByMemberAndRoom(member, room);
        roomMembersRepository.delete(roomMembers);
    }

    @Override
    public int getMemberCount(Room room) {
        return roomMembersRepository.countRoomMembersByRoom(room);
    }

    @Override
    public RoomMembers findRoomMembersbySessionId(String sessionId) {
        Optional<RoomMembers> optionalRoomMembers = roomMembersRepository.findBySessionId(sessionId);
        return optionalRoomMembers.orElse(null);
    }

    @Override
    public List<Member> getMembers(Room room) {
        return memberRepository.findMemberByRoom(room.getRoomId());
    }
}
