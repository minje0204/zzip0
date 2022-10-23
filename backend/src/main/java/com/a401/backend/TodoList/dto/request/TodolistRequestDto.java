package com.a401.backend.TodoList.dto.request;

import com.a401.backend.TodoList.domain.Todolist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodolistRequestDto {

    private LocalDateTime date;

    // 멤버 request dto
    // private MemberRequestDto memberrequestdto;

    public Todolist toEntity(){
        return Todolist.builder().date(date).build();
    }

    @Builder
    public TodolistRequestDto(LocalDateTime date){
        this.date = date;
    }

}
