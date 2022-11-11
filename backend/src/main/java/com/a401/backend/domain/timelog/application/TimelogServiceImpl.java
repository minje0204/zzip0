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

import java.time.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class TimelogServiceImpl implements TimelogService {

    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    @Override
    public TimelogResponseDto start(TimelogRequestDto request, Member member) {

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDate date = now.toLocalDate();
        LocalTime startTime = now.toLocalTime();

        Timelog log = null;

        if (request.getType().equals("NORMAL")) {
            log = Timelog.builder()
                    .subject(request.getSubject())
                    .member(member)
                    .date(date)
                    .startTime(startTime)
                    .build();
        } else if (request.getType().equals("TODO")) {
            Optional<TodoItem> todo = todoItemRepository.findById(request.getTodoitemId());

            log = Timelog.builder()
                    .todoitem(todo.orElseThrow())
                    .member(member)
                    .date(date)
                    .startTime(startTime)
                    .build();
        }

        Timelog savedLog = timelogRepository.save(log);
        TimelogResponseDto response = TimelogResponseDto.builder().timelog(savedLog).build();

        return response;
    }

    @Override
    public void finish(TimelogRequestDto request, Member member) {
        Optional<Timelog> prevLog = timelogRepository.findById(request.getTimelogId());

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
//        로컬환경 시간 넘어갈 때 환경 테스트 용도
//        LocalDateTime now = LocalDateTime.of(2022,11,10,0,10,10);
        LocalDate date = now.toLocalDate();
        LocalTime endTime = now.toLocalTime();

        Duration duration = Duration.between(prevLog.get().getStartTime(),endTime);
        long dif = duration.getSeconds();

        if (request.getType().equals("NORMAL")) {
            //만약 날짜가 넘어갔다면
            if (!prevLog.get().getDate().equals(date)) {
                //이전 날짜 처리
                Timelog today = Timelog.builder()
                        .timelogId(prevLog.get().getTimelogId())
                        .date(prevLog.get().getDate())
                        .subject(prevLog.get().getSubject())
                        .member(member)
                        .startTime(prevLog.get().getStartTime())
                        .endTime(LocalTime.of(0,0,0))
                        .build();

                timelogRepository.save(today);

                //다음 날짜 처리
                Timelog tomorrow = Timelog.builder()
                        .subject(prevLog.get().getSubject())
                        .date(date)
                        .member(member)
                        .startTime(LocalTime.of(0,0,0))
                        .endTime(endTime)
                        .build();

                timelogRepository.save(tomorrow);
            } else {
                Timelog log = Timelog.builder()
                        .timelogId(prevLog.get().getTimelogId())
                        .date(date)
                        .subject(prevLog.get().getSubject())
                        .member(member)
                        .startTime(prevLog.get().getStartTime())
                        .endTime(endTime)
                        .build();
                timelogRepository.save(log);
            }
        } else if (request.getType().equals("TODO")) {
            Optional<TodoItem> todo = todoItemRepository.findById(request.getTodoitemId());

            TodoItem saveTodo = TodoItem.builder()
                    .id(todo.get().getId())
                    .complete(true)
                    .content(todo.get().getContent())
                    .subject(todo.get().getSubject())
                    .todolist(todo.get().getTodolist())
                    .time(todo.get().getTime() + dif)
                    .build();

            todoItemRepository.save(saveTodo);

            //만약 날짜가 넘어갔다면
            if (!prevLog.get().getDate().equals(date)) {
                //이전 날짜 처리
                Timelog today = Timelog.builder()
                        .timelogId(prevLog.get().getTimelogId())
                        .date(prevLog.get().getDate())
                        .todoitem(todo.orElseThrow())
                        .member(member)
                        .startTime(prevLog.get().getStartTime())
                        .endTime(LocalTime.of(0,0,0))
                        .build();

                timelogRepository.save(today);

                //다음 날짜 처리
                Timelog tomorrow = Timelog.builder()
                        .todoitem(todo.orElseThrow())
                        .date(date)
                        .member(member)
                        .startTime(LocalTime.of(0,0,0))
                        .endTime(endTime)
                        .build();

                timelogRepository.save(tomorrow);
            } else {
                Timelog log = Timelog.builder()
                        .timelogId(prevLog.get().getTimelogId())
                        .date(date)
                        .todoitem(todo.orElseThrow())
                        .member(member)
                        .startTime(prevLog.get().getStartTime())
                        .endTime(endTime)
                        .build();
                timelogRepository.save(log);
            }
        }

    }
}
