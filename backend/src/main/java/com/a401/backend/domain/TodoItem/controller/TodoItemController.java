package com.a401.backend.domain.TodoItem.controller;

import com.a401.backend.domain.TodoList.service.TodoListService;
import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
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
public class TodoItemController {

    private final TodoItemService todoitemService;
    private final TodoListService todolistService;

    @PostMapping("/{date}")
    public ResponseEntity<?> saveTodoItem(@PathVariable("date") LocalDateTime date, @RequestBody List<TodoItemRequestDto> todoItemRequestDtos) {
        try {
            // TODO: 2022-10-22 추후에 getHeader로 token 받아와서 member 또한 저장
            Long todoListId = todolistService.saveTodoList(date);
            for (TodoItemRequestDto todoitemRequestDto : todoItemRequestDtos) {
                todoitemService.saveTodoitem(todoListId,todoitemRequestDto);
            }
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
    public ResponseEntity<?> updateTodoItem(@PathVariable("todoItemId") Long todoItemId, @RequestBody List<TodoItemRequestDto> todoitemRequestList){
        try{
            for (TodoItemRequestDto todoitemRequestDto : todoitemRequestList) {
                todoitemService.updateTodoItem(todoItemId, todoitemRequestDto);
            }
            return new ResponseEntity<>("성공적으로 수정",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("실패",HttpStatus.NOT_FOUND);

        }


    }

}
