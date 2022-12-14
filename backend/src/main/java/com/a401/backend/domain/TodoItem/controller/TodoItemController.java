package com.a401.backend.domain.TodoItem.controller;

import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoItem.service.TodoItemService;
import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.service.TodoListService;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/todo")
public class TodoItemController {

    private final TodoItemService todoitemService;
    private final TodoListService todolistService;

    @PostMapping("/{date}")
    public ResponseEntity<?> saveTodoItem(
            @PathVariable("date") @DateTimeFormat(pattern = "yyyyMMdd") LocalDate date,
            @RequestBody TodoItemRequestDto todoItemRequestDto,
            @CurrentUser PrincipalDetails principalDetails) {

        // 멤버 가져오기
        Member member = principalDetails.getMember();

        // todoList 가져오기
        TodoList todoList;
        todoList = todolistService.getTodoList(date, member);

        // todoList가 없다면 만들어서 거기에 저장
        if (todoList == null) {
            todoList = todolistService.saveTodoList(date, member);
        }
        try {
            TodoItemResponseDto todoItemResponseDto = todoitemService.saveTodoItem(todoList, todoItemRequestDto);
            return new ResponseEntity<>(todoItemResponseDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{todoItemId}")
    public ResponseEntity<?> deleteTodoItem(@PathVariable("todoItemId") Long todoItemId) {
        try {
            todoitemService.deleteTodoItem(todoItemId);
            return new ResponseEntity<>("성공적으로 삭제", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{todoItemId}")
    public ResponseEntity<?> updateTodoItem(@PathVariable("todoItemId") Long todoItemId, @RequestBody TodoItemRequestDto todoItemRequestDto) {
        try {
            todoitemService.updateTodoItem(todoItemId, todoItemRequestDto);
            return new ResponseEntity<>("성공적으로 수정", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
