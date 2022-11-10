package com.a401.backend.domain.room.dto.response;

import com.a401.backend.domain.model.BackgroundCategory;
import com.a401.backend.domain.room.domain.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class RoomResponseDto {
    private Long roomId;
    private String roomTitle;
    private String roomUrl;
    private BackgroundCategory roomCategory;
    private LocalDateTime startTime;

    @Builder
    public RoomResponseDto(Room room) {
        this.roomId = room.getRoomId();
        this.roomTitle = room.getRoomTitle();
        this.roomUrl = room.getRoomUrl().toString();
        this.roomCategory = room.getRoomCategory();
        this.startTime = room.getStartTime();
    }
}
