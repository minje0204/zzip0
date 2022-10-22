package com.a401.backend.TodoItem.service;

import com.a401.backend.TodoItem.dto.response.TodolistResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public interface TodolistService {
    Long saveTodoList(LocalDateTime date);
}
