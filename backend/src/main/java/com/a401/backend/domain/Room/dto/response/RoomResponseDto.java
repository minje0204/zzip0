package com.a401.backend.domain.Room.dto.response;

import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.model.BgmCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class RoomResponseDto {
    private String roomTitle;
    private String roomUrl;
    private BgmCategory roomCategory;
    private LocalDateTime startTime;

    @Builder
    public RoomResponseDto(Room room) {
        this.roomTitle = room.getRoomTitle();
        this.roomUrl = room.getRoomUrl();
        this.roomCategory = room.getRoomCategory();
        this.startTime = room.getStartTime();
    }
}
