package com.a401.backend.TodoItem.dto.response;

import com.a401.backend.TodoList.dto.response.TodolistResponseDto;
import com.a401.backend.TodoItem.domain.Todoitem;
import com.a401.backend.global.dtoConverter.Converter;
import com.a401.backend.global.enums.Subject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TodoitemResponseDto {
    private boolean complete;
    private String task;
    private Subject subject;
    private TodolistResponseDto todolistResponseDto;

    @Builder
    public TodoitemResponseDto(Todoitem todoitem){
        this.complete = todoitem.isComplete();
        this.task = todoitem.getTask();
        this.subject = todoitem.getSubject();
        this.todolistResponseDto = Converter.todolistConverter(todoitem.getTodolist());
    }
}
