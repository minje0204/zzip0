package com.a401.backend.TodoList.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodolistResponseDto {

    private LocalDateTime date;

    // 로그인한 유저의 정보
    // 추후에 추가


    @Builder
    public TodolistResponseDto(LocalDateTime date){
        this.date = date;
    }

}
