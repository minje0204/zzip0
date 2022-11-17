package com.a401.backend.domain.TodoItem.service.serviceImpl;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.TodoItem.service.TodoItemService;
import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.repository.TodoListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class TodoItemServiceImpl implements TodoItemService {

    private final TodoItemRepository todoitemRepository;
    private final TodoListRepository todolistRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TodoItemResponseDto> getAllTodoItem(TodoList todoList) {
        // TodoList로 해당되는 TodoItem들 가져오기
        List<TodoItem> todoItems = todoitemRepository.findAllByTodolist(todoList);

        // entity -> dto
        List<TodoItemResponseDto> todoItemResponseDtos = todoItems.stream().map(TodoItemResponseDto::new).collect(Collectors.toList());
        return todoItemResponseDtos;
    }

    @Override
    public TodoItemResponseDto saveTodoItem(TodoList todoList, TodoItemRequestDto todoitemRequestDto) {
        TodoItem todoitem = TodoItem.builder()
                .complete(false)
                .content(todoitemRequestDto.getContent())
                .subject(todoitemRequestDto.getSubject())
                .todolist(todoList)
                .build();

        TodoItem savedTodoItem = todoitemRepository.save(todoitem);
        TodoItemResponseDto todoItemResponseDto = TodoItemResponseDto.builder()
                .todoitem(savedTodoItem)
                .build();
        return todoItemResponseDto;
    }

    @Override
    public void deleteTodoItem(Long todoItemId) {
        TodoItem todoItem = todoitemRepository.findById(todoItemId).orElseThrow();
        todoitemRepository.delete(todoItem);
    }

    @Override
    @Transactional
    public void updateTodoItem(Long todoItemId, TodoItemRequestDto todoitemRequestDto) {
        TodoItem todoItem = todoitemRepository.findById(todoItemId).orElseThrow();

        todoItem.update(todoItem, todoitemRequestDto);
    }
}
