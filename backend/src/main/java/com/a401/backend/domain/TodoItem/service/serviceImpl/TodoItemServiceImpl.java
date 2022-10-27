package com.a401.backend.domain.TodoItem.service.serviceImpl;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.dto.request.TodoListRequestDto;
import com.a401.backend.domain.TodoList.repository.TodoListRepository;
import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.TodoItem.service.TodoItemService;
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
public class TodoItemServiceImpl implements TodoItemService {

    private final TodoItemRepository todoitemRepository;
    private final TodoListRepository todolistRepository;

    // TODO: todoitem 저장
    @Override
    public Long saveTodoItem(Long todoListId, TodoItemRequestDto todoitemRequestDto) {
        // 의문점
        // TodoList 안에 TodoItem이 있는데 그럼 todolist를 먼저 저장을 하고 todoitem을 저장해야 하는데
        // 그럼 todolist를 저장하는 버튼이 있나?
        TodoList todolist = todolistRepository.findById(todoListId).orElseThrow();
        // todolistRequestDto 생성하기
        TodoListRequestDto todolistRequestDto = TodoListRequestDto.builder().date(todolist.getDate()).build();
        // TODO: 추후에 memberReqeusetDto를 저장

        // todoItemRequestDto에 tolistRequestDto 넣어주기
        todoitemRequestDto.setTodolistRequestDto(todolistRequestDto);
        TodoItem todoitem = todoitemRequestDto.toEntity();
        todoitemRepository.save(todoitem);
        return todoitem.getId();
    }

    // TODO: todoitemId에 해당하는 정보 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<TodoItemResponseDto> getAllTodoItem(LocalDateTime date) {
        TodoList todolist = todolistRepository.findTodolistByDate(date);
        List<TodoItem> todoItems = todoitemRepository.findAllById(todolist.getId());
        List<TodoItemResponseDto> todoItemResponseDtos = todoItems.stream().map(TodoItemResponseDto::new).collect(Collectors.toList());
        return todoItemResponseDtos;
    }

    // TODO: todoItem 삭제하기
    @Override
    public void deleteTodoItem(Long todoItemId) {
        TodoItem todoItem = todoitemRepository.findById(todoItemId).orElseThrow();
        todoitemRepository.delete(todoItem);
    }

    // TODO: todoItem 수정하기
    @Override
    public void updateTodoItem(Long todoItemId, TodoItemRequestDto todoitemRequestDto) {
        TodoItem todoitem = todoitemRepository.findById(todoItemId).orElseThrow();
        todoitem.update(todoItemId, todoitemRequestDto);
    }
}
