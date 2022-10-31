package com.a401.backend.domain.TodoList.controller;

import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoItem.service.TodoItemService;
import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.service.TodoListService;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/todo")
public class TodoListController {
    private final TodoItemService todoitemService;
    private final TodoListService todoListService;

    @GetMapping("/{date}")
    public ResponseEntity<?> getAllTodoList(@PathVariable("date") LocalDateTime date, @CurrentUser PrincipalDetails principalDetails) {

        Member member = principalDetails.getMember();
        TodoList todoList = todoListService.getTodoList(date, member);
        if (todoList != null) {
            List<TodoItemResponseDto> todoItemResponseDtos = todoitemService.getAllTodoItem(todoList);
            if (todoItemResponseDtos.size() > 0)
                return new ResponseEntity<>(todoItemResponseDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>("등록한 일정이 없습니다", HttpStatus.NO_CONTENT);
    }
}
