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


    @Builder
    public TodoListRequestDto(LocalDateTime date) {
        this.date = date;
    }

    public TodoList toEntity() {
        return TodoList.builder().date(date).build();
    }

}
