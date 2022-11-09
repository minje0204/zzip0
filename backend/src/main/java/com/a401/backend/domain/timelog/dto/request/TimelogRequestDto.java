package com.a401.backend.domain.timelog.dto.request;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TimelogRequestDto {

    private long timelogId;
    private long todoitemId;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
//    private LocalDateTime requestTime;

    @Builder
    public TimelogRequestDto(Timelog timelog, TodoItem todoitem) {
        this.timelogId = timelog.getTimelogId();
        this.todoitemId = todoitem.getId();
    }

}
