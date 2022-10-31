package com.a401.backend.domain.TodoList.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodoListResponseDto {

    private LocalDateTime date;

    // TODO: 2022-10-31 로그인한 유저의 정보를 response에 담아서 줄 필요가 있는가? 
    @Builder
    public TodoListResponseDto(LocalDateTime date) {
        this.date = date;
    }

}
