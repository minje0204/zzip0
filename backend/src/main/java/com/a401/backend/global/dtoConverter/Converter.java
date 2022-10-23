package com.a401.backend.global.dtoConverter;

import com.a401.backend.TodoList.domain.Todolist;
import com.a401.backend.TodoList.dto.request.TodolistRequestDto;
import com.a401.backend.TodoList.dto.response.TodolistResponseDto;
import org.springframework.stereotype.Component;

@Component
public class Converter {

    // TODO: todolist를 responsedto로 변환
    public static TodolistResponseDto todolistConverter(Todolist todolist){
        return TodolistResponseDto.builder().date(todolist.getDate()).build();
    }


    // TODO: todolistrequest를 todolist entity로 변환
    public static Todolist todoListRequestCoverter(TodolistRequestDto todolistRequestDto){
        return Todolist.builder().date(todolistRequestDto.getDate()).build();
    }

    // TODO: todoItem


}
