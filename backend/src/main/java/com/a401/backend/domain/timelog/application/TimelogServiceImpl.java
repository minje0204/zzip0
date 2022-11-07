package com.a401.backend.domain.timelog.application;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.a401.backend.domain.timelog.dto.request.TimelogRequestDto;
import com.a401.backend.domain.timelog.dto.response.TimelogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class TimelogServiceImpl implements TimelogService {

    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    @Override
    public TimelogResponseDto start(TimelogRequestDto request, Member member) {
        Optional<TodoItem> todo = todoItemRepository.findById(request.getTodoitemId());

        Timelog log = Timelog.builder()
                .todoitem(todo.orElseThrow())
                .member(member)
                .startTime(request.getStartTime())
                .build();

        Timelog savedLog = timelogRepository.save(log);
        TimelogResponseDto response = TimelogResponseDto.builder().timelog(savedLog).build();

        return response;
    }

    @Override
    public void finish(TimelogRequestDto request, Member member) {
        Optional<TodoItem> todo = todoItemRepository.findById(request.getTodoitemId());

        Timelog log = Timelog.builder()
                .timelogId(request.getTimelogId())
                .todoitem(todo.orElseThrow())
                .member(member)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        timelogRepository.save(log);
    }
}
