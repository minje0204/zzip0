package com.a401.backend.global.dtoConverter;

import com.a401.backend.TodoItem.domain.Todolist;
import com.a401.backend.TodoItem.dto.request.TodolistRequestDto;
import com.a401.backend.TodoItem.dto.response.TodolistResponseDto;
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
