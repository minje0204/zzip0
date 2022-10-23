package com.a401.backend.TodoList.controller;

import com.a401.backend.TodoItem.dto.response.TodoitemResponseDto;
import com.a401.backend.TodoItem.service.TodoitemService;
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
    private final TodoitemService todoitemService;

    @GetMapping("/{date}")
    public ResponseEntity<?> getAllTodoList(@PathVariable("date")LocalDateTime date){
        List<TodoitemResponseDto> todoitemResponseDtos = todoitemService.getAllTodoItem(date);
        if(todoitemResponseDtos.size() == 0){
            return new ResponseEntity<>("등록한 일정이 없습니다", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(todoitemResponseDtos, HttpStatus.OK);
        }

    }
}
