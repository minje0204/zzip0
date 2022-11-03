package com.a401.backend.domain.TodoItem.service;

import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoList.domain.TodoList;

import java.util.List;

public interface TodoItemService {
    TodoItemResponseDto saveTodoItem(TodoList todoList, TodoItemRequestDto todoitemRequestDto);

    List<TodoItemResponseDto> getAllTodoItem(TodoList todoList);

    void deleteTodoItem(Long todoItemId);

    void updateTodoItem(Long todoItemId, TodoItemRequestDto todoitemRequestDto);

}
