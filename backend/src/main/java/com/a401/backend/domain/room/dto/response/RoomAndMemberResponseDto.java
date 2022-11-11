package com.a401.backend.domain.room.dto.response;


import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.domain.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class RoomAndMemberResponseDto {
    private Long roomId;
    private String roomTitle;
    private String roomUrl;
    private Background background;

    private LocalDateTime startTime;
    private List<Member> memberList;

    @Builder
    public RoomAndMemberResponseDto(Room room, List<Member> memberList) {
        this.roomId = room.getRoomId();
        this.roomTitle = room.getRoomTitle();
        this.roomUrl = room.getRoomUrl().toString();
        this.background = room.getBackground();
        this.startTime = room.getStartTime();
        this.memberList = memberList;
    }
}
