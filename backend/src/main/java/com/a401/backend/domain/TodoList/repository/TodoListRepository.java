package com.a401.backend.domain.TodoList.repository;

import com.a401.backend.domain.TodoList.domain.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {
    TodoList findTodolistByDate(LocalDateTime date);

}
