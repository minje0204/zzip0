package com.a401.backend.domain.TodoItem.repository;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findAllById(Long todoItemId);


}