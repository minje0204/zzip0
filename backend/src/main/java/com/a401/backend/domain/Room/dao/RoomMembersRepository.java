package com.a401.backend.domain.Room.dao;

import com.a401.backend.domain.Room.domain.RoomMembers;
import com.a401.backend.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


@Service
public interface RoomMembersRepository extends JpaRepository<RoomMembers,Long> {
    boolean existsByMember(Member member);
}
