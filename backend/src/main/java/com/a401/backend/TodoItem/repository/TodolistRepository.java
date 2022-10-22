package com.a401.backend.TodoItem.repository;

import com.a401.backend.TodoItem.domain.Todolist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodolistRepository extends JpaRepository<Todolist, Long> {
    Todolist findTodolistByDate(LocalDateTime date);

}
