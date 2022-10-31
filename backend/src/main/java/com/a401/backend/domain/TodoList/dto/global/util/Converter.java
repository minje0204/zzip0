package com.a401.backend.domain.TodoList.dto.global.util;

import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.TodoList.dto.request.TodoListRequestDto;
import com.a401.backend.domain.TodoList.dto.response.TodoListResponseDto;
import org.springframework.stereotype.Component;

@Component
public class Converter {

    // TODO: todolist를 responsedto로 변환
    public static TodoListResponseDto todolistConverter(TodoList todolist){
        return TodoListResponseDto.builder().date(todolist.getDate()).build();
    }


    // TODO: todolistrequest를 todolist entity로 변환
    public static TodoList todoListRequestCoverter(TodoListRequestDto todolistRequestDto){
        return TodoList.builder().date(todolistRequestDto.getDate()).build();
    }

    // TODO: todoItem


}
