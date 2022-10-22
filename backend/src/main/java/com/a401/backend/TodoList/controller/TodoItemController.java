package com.a401.backend.TodoList.controller;

import com.a401.backend.TodoItem.service.TodolistService;
import com.a401.backend.TodoList.dto.request.TodoitemRequestDto;
import com.a401.backend.TodoList.dto.response.TodoitemResponseDto;
import com.a401.backend.TodoList.service.TodoitemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/todo")
public class TodoItemController {

    private final TodoitemService todoitemService;
    private final TodolistService todolistService;

    @PostMapping("/{date}")
    public ResponseEntity<?> saveTodoItem(@PathVariable("date") LocalDateTime date, @RequestBody @Valid TodoitemRequestDto todoitemRequestDto) {
        try {
            // TODO: 2022-10-22 추후에 getHeader로 token 받아와서 member 또한 저장
            Long todoListId = todolistService.saveTodoList(date);
            todoitemService.saveTodoitem(todoListId, todoitemRequestDto);
            return new ResponseEntity<>("성공적으로 저장",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{todoItemId}")
    public ResponseEntity<?> deleteTodoItem(@PathVariable("todoItemId") Long todoItemId){
        try{
            todoitemService.deleteTodoItem(todoItemId);
            return new ResponseEntity<>("성공적으로 삭제",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("삭제 실패",HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{todoItemId}")
    public ResponseEntity<?> updateTodoItem(@PathVariable("todoItemId") Long todoItemId, @RequestBody @Valid TodoitemRequestDto todoitemRequestDto){
        try{
            todoitemService.updateTodoItem(todoItemId, todoitemRequestDto);
            return new ResponseEntity<>("성공적으로 수정",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("실패",HttpStatus.NOT_FOUND);

        }


    }

}
