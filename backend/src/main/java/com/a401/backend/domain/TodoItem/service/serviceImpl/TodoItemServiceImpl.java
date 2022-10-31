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

    // 수정 완료
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
    public Long saveTodoItem(TodoList todoList, TodoItemRequestDto todoitemRequestDto) {
        TodoItem todoitem = TodoItem.builder()
                .complete(false)
                .content(todoitemRequestDto.getContent())
                .subject(todoitemRequestDto.getSubject())
                .todolist(todoList)
                .build();

        todoitemRepository.save(todoitem);
        return todoitem.getId();
    }

    // 수정 필요


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
