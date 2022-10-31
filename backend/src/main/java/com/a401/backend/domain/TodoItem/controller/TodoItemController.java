package com.a401.backend.domain.TodoItem.controller;

import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
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
public class TodoItemController {

    private final TodoItemService todoitemService;
    private final TodoListService todolistService;

    @PostMapping("/{date}")
    public ResponseEntity<?> saveTodoItem(
            @PathVariable("date") LocalDateTime date,
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
            todoitemService.saveTodoItem(todoList, todoItemRequestDto);
            return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
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
    public ResponseEntity<?> updateTodoItem(@PathVariable("todoItemId") Long todoItemId, @RequestBody List<TodoItemRequestDto> todoitemRequestList) {
        try {
            // TODO: 2022-10-31 받은 투두 아이템 아이디 하나만 패치하기
            for (TodoItemRequestDto todoitemRequestDto : todoitemRequestList) {
                todoitemService.updateTodoItem(todoItemId, todoitemRequestDto);
            }
            return new ResponseEntity<>("성공적으로 수정", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
