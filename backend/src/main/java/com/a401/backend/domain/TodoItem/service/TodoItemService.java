package com.a401.backend.domain.TodoItem.service;

import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public interface TodoItemService {
    void saveTodoitem(Long todoListId, TodoItemRequestDto todoitemRequestDto);
    List<TodoItemResponseDto> getAllTodoItem(LocalDateTime date);

    void deleteTodoItem(Long todoItemId);

    void updateTodoItem(Long todoItemId, TodoItemRequestDto todoitemRequestDto);

}
