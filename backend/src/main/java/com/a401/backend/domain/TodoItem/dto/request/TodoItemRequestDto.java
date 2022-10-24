package com.a401.backend.domain.TodoItem.dto.request;

import com.a401.backend.domain.TodoList.dto.request.TodoListRequestDto;
import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.global.util.Converter;
import com.a401.backend.domain.model.Subject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TodoItemRequestDto {

    private boolean complete;
    private String task;
    private Subject subject;
    private TodoListRequestDto todolistRequestDto;

    public TodoItem toEntity() {
        return TodoItem.builder().complete(complete).subject(subject)
                .todolist(Converter.todoListRequestCoverter(todolistRequestDto)).build();
    }
}
