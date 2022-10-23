package com.a401.backend.TodoItem.dto.request;

import com.a401.backend.TodoList.dto.request.TodolistRequestDto;
import com.a401.backend.TodoItem.domain.Todoitem;
import com.a401.backend.global.dtoConverter.Converter;
import com.a401.backend.global.enums.Subject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TodoitemRequestDto {

    private boolean complete;
    private String task;
    private Subject subject;
    private TodolistRequestDto todolistRequestDto;

    public Todoitem toEntity() {
        return Todoitem.builder().complete(complete).subject(subject)
                .todolist(Converter.todoListRequestCoverter(todolistRequestDto)).build();
    }
}
