package com.a401.backend.domain.TodoList.repository;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {
    Optional<TodoList> findTodolistByDateAndMember(LocalDate date, Member member);

}
