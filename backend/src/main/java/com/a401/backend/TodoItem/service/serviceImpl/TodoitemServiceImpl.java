package com.a401.backend.TodoItem.service.serviceImpl;

import com.a401.backend.TodoList.domain.Todolist;
import com.a401.backend.TodoList.dto.request.TodolistRequestDto;
import com.a401.backend.TodoList.repository.TodolistRepository;
import com.a401.backend.TodoItem.domain.Todoitem;
import com.a401.backend.TodoItem.dto.request.TodoitemRequestDto;
import com.a401.backend.TodoItem.dto.response.TodoitemResponseDto;
import com.a401.backend.TodoItem.repository.TodoitemRepository;
import com.a401.backend.TodoItem.service.TodoitemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class TodoitemServiceImpl implements TodoitemService {

    private final TodoitemRepository todoitemRepository;
    private final TodolistRepository todolistRepository;

    // TODO: todoitem 저장
    @Override
    public void saveTodoitem(Long todoListId, TodoitemRequestDto todoitemRequestDto) {
        // 의문점
        // TodoList 안에 TodoItem이 있는데 그럼 todolist를 먼저 저장을 하고 todoitem을 저장해야 하는데
        // 그럼 todolist를 저장하는 버튼이 있나?
        Optional<Todolist> todolistDto = todolistRepository.findById(todoListId);
        if(todolistDto.isPresent()){
            // todolistRequestDto 생성하기
            TodolistRequestDto todolistRequestDto = TodolistRequestDto.builder().date(todolistDto.get().getDate()).build();
            // TODO: 추후에 memberReqeusetDto를 저장

            // todoItemRequestDto에 tolistRequestDto 넣어주기
            todoitemRequestDto.setTodolistRequestDto(todolistRequestDto);
            Todoitem todoitem = todoitemRequestDto.toEntity();
            todoitemRepository.save(todoitem);
        }else{
            // 예외 처리

        }
    }

    // TODO: todoitemId에 해당하는 정보 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<TodoitemResponseDto> getAllTodoItem(LocalDateTime date) {
        Todolist todolist = todolistRepository.findTodolistByDate(date);
        List<Todoitem> todoItems = todoitemRepository.findAll(todolist.getId());
        List<TodoitemResponseDto> todoItemResponseDtos = todoItems.stream().map(TodoitemResponseDto::new).collect(Collectors.toList());
        return todoItemResponseDtos;
    }

    // TODO: todoItem 삭제하기
    @Override
    public void deleteTodoItem(Long todoItemId) {
        Optional<Todoitem> todoItem = todoitemRepository.findById(todoItemId);
        if(todoItem.isPresent()){
            todoitemRepository.delete(todoItem.get());
        }else{
            // 예외 처리
        }
    }

    // TODO: todoItem 수정하기
    @Override
    public void updateTodoItem(Long todoItemId,TodoitemRequestDto todoitemRequestDto) {
        Optional<Todoitem> todoitem = todoitemRepository.findById(todoItemId);
        if(todoitem.isPresent()){
            todoitem.get().update(todoItemId, todoitemRequestDto);
        }else{
            // 예외 처리
        }
    }
}
