package com.a401.backend.TodoItem.service.serviceImpl;

import com.a401.backend.TodoItem.domain.Todolist;
import com.a401.backend.TodoItem.dto.response.TodolistResponseDto;
import com.a401.backend.TodoItem.repository.TodolistRepository;
import com.a401.backend.TodoItem.service.TodolistService;
import com.a401.backend.TodoList.dto.response.TodoitemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class TodolistServiceImpl implements TodolistService {
    private final TodolistRepository todolistRepository;

    @Override
    public Long saveTodoList(LocalDateTime date) {
        // TODO: member 정보 저장은 추후에
        Todolist todolist = todolistRepository.save(Todolist.builder().date(date).build());
        return todolist.getId();

    }

}
