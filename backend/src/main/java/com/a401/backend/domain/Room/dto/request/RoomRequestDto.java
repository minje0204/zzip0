package com.a401.backend.domain.Room.dto.request;

import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.model.VideoCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class RoomRequestDto {
    private String roomTitle;
    private VideoCategory roomCategory;

    @Builder
    public RoomRequestDto(Room room) {
        this.roomTitle = room.getRoomTitle();
        this.roomCategory = room.getRoomCategory();
    }

}
