package com.a401.backend.domain.TodoList.controller;

import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoItem.service.TodoItemService;
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

    @GetMapping("/{date}")
    public ResponseEntity<?> getAllTodoList(@PathVariable("date")LocalDateTime date){
        List<TodoItemResponseDto> todoItemResponseDtos = todoitemService.getAllTodoItem(date);
        if(todoItemResponseDtos.size() == 0){
            return new ResponseEntity<>("등록한 일정이 없습니다", HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity<>(todoItemResponseDtos, HttpStatus.OK);
        }

    }
}
