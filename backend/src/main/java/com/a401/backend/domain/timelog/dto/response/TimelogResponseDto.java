package com.a401.backend.domain.timelog.dto.response;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.timelog.domain.Timelog;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class TimelogResponseDto {

    private long timelogId;

    @Builder
    public TimelogResponseDto(Timelog timelog) {
        this.timelogId = timelog.getTimelogId();
    }

}
