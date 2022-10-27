package com.a401.backend.domain.TodoList.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodoListResponseDto {

    private LocalDateTime date;

    // 로그인한 유저의 정보
    // 추후에 추가


    @Builder
    public TodoListResponseDto(LocalDateTime date){
        this.date = date;
    }

}
