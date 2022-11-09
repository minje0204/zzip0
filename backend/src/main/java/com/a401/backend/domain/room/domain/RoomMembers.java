package com.a401.backend.domain.room.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roomMemberID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private String sessionId;

    @Builder
    public RoomMembers(long roomMemberID, Room room, Member member, String sessionId) {
        this.roomMemberID = roomMemberID;
        this.room = room;
        this.member = member;
        this.sessionId = sessionId;
    }
}
