package com.a401.backend.domain.TodoList.dto.request;

import com.a401.backend.domain.TodoList.domain.TodoList;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodoListRequestDto {

    private LocalDateTime date;

    // 멤버 request dto
    // private MemberRequestDto memberrequestdto;

    public TodoList toEntity(){
        return TodoList.builder().date(date).build();
    }

    @Builder
    public TodoListRequestDto(LocalDateTime date){
        this.date = date;
    }

}
