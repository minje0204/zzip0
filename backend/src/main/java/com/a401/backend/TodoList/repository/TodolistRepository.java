package com.a401.backend.TodoList.repository;

import com.a401.backend.TodoList.domain.Todolist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TodolistRepository extends JpaRepository<Todolist, Long> {
    Todolist findTodolistByDate(LocalDateTime date);

}
