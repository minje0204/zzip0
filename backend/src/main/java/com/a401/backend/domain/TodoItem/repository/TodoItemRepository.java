package com.a401.backend.domain.TodoItem.repository;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoList.domain.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findAllByTodolist(TodoList todoList);

    @Query(value = "SELECT * FROM todo_item WHERE todoitem_id = :todoitem_id",nativeQuery = true)
    Optional<TodoItem> findByTodoitem(long todoitem_id);
}
