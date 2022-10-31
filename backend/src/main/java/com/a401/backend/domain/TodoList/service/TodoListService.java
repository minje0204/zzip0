package com.a401.backend.domain.TodoList.service;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.member.domain.Member;
import java.time.LocalDateTime;

public interface TodoListService {

    TodoList getTodoList(LocalDateTime date, Member member);
}
