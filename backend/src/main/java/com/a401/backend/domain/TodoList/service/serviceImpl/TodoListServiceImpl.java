package com.a401.backend.domain.TodoList.service.serviceImpl;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.repository.TodoListRepository;
import com.a401.backend.domain.TodoList.service.TodoListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class TodoListServiceImpl implements TodoListService {
    private final TodoListRepository todolistRepository;

    @Override
    public Long saveTodoList(LocalDateTime date) {
        // TODO: member 정보 저장은 추후에
        TodoList todolist = todolistRepository.save(TodoList.builder().date(date).build());
        return todolist.getId();

    }

}
