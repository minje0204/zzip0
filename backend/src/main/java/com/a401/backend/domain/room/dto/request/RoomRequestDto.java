package com.a401.backend.domain.room.dto.request;

import com.a401.backend.domain.model.VideoCategory;
import com.a401.backend.domain.room.domain.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
