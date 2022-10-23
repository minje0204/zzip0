package com.a401.backend.TodoList.service.serviceImpl;

import com.a401.backend.TodoList.domain.Todolist;
import com.a401.backend.TodoList.repository.TodolistRepository;
import com.a401.backend.TodoList.service.TodolistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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
