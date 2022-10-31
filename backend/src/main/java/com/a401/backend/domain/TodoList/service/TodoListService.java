package com.a401.backend.domain.TodoList.service;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.member.domain.Member;

import java.time.LocalDate;

public interface TodoListService {

    TodoList getTodoList(LocalDate date, Member member);

    TodoList saveTodoList(LocalDate date, Member member);
}
