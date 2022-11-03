package com.a401.backend.domain.room.domain;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomHistory {
    @Id
    @GeneratedValue
    private long roomHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private RoomAction roomAction;
    private LocalDateTime actionTime;

    @Builder
    public RoomHistory(Room room, Member member, RoomAction roomAction, LocalDateTime actionTime) {
        this.room = room;
        this.member = member;
        this.roomAction = roomAction;
        this.actionTime = actionTime;
    }
}
