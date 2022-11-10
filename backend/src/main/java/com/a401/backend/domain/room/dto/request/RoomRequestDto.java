package com.a401.backend.domain.room.dto.request;

import com.a401.backend.domain.model.BackgroundCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RoomRequestDto {
    private String roomTitle;
    private Long backgroundId;
    private BackgroundCategory backgroundCategory;

    @Builder
    public RoomRequestDto(String roomTitle, Long backgroundId, BackgroundCategory backgroundCategory) {
        this.roomTitle = roomTitle;
        this.backgroundId = backgroundId;
        this.backgroundCategory = backgroundCategory;
    }

    @Override
    public String toString() {
        return "RoomRequestDto{" +
                "roomTitle='" + roomTitle + '\'' +
                ", backgroundId=" + backgroundId +
                ", backgroundCategory=" + backgroundCategory +
                '}';
    }
}
