package com.a401.backend.domain.TodoItem.dto.response;

import com.a401.backend.domain.TodoList.dto.response.TodoListResponseDto;
import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.global.util.Converter;
import com.a401.backend.domain.model.Subject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TodoItemResponseDto {
    private boolean complete;
    private String task;
    private Subject subject;
    private TodoListResponseDto todolistResponseDto;

    @Builder
    public TodoItemResponseDto(TodoItem todoitem){
        this.complete = todoitem.isComplete();
        this.task = todoitem.getTask();
        this.subject = todoitem.getSubject();
        this.todolistResponseDto = Converter.todolistConverter(todoitem.getTodolist());
    }
}
