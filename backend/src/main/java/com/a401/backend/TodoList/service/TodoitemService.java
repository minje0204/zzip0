package com.a401.backend.TodoList.service;

import com.a401.backend.TodoItem.dto.request.TodolistRequestDto;
import com.a401.backend.TodoList.dto.request.TodoitemRequestDto;
import com.a401.backend.TodoList.dto.response.TodoitemResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public interface TodoitemService {
    void saveTodoitem(Long todoListId, TodoitemRequestDto todoitemRequestDto);
    List<TodoitemResponseDto> getAllTodoItem(LocalDateTime date);

    void deleteTodoItem(Long todoItemId);

    void updateTodoItem(Long todoItemId, TodoitemRequestDto todoitemRequestDto);

}
