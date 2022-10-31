package com.a401.backend.domain.TodoItem.dto.request;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.model.Subject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TodoItemRequestDto {

    private boolean complete;
    private String content;
    private Subject subject;

    @Builder
    public TodoItemRequestDto(boolean complete, String content, Subject subject) {
        this.complete = complete;
        this.content = content;
        this.subject = subject;
    }

    public TodoItem toEntity() {
        return TodoItem.builder().complete(complete).subject(subject).build();
    }
}
