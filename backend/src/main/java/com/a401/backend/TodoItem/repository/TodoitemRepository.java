package com.a401.backend.TodoItem.repository;

import com.a401.backend.TodoItem.domain.Todoitem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoitemRepository extends JpaRepository<Todoitem, Long> {
    List<Todoitem> findAll(Long todoItemId);


}
