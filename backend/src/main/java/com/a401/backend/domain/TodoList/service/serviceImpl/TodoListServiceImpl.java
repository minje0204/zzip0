package com.a401.backend.domain.TodoList.service.serviceImpl;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.repository.TodoListRepository;
import com.a401.backend.domain.TodoList.service.TodoListService;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class TodoListServiceImpl implements TodoListService {
    private final TodoListRepository todolistRepository;

    @Override
    public TodoList getTodoList(LocalDate date, Member member) {
        Optional<TodoList> optionalTodoList = todolistRepository.findTodolistByDateAndMember(date, member);
        return optionalTodoList.orElse(null);
    }

    @Override
    public TodoList saveTodoList(LocalDate date, Member member) {
        TodoList todoList = TodoList.builder()
                .member(member)
                .date(date)
                .build();
        return todolistRepository.save(todoList);
    }

}
