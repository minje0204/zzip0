package com.a401.backend.domain.timelog.application;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.a401.backend.domain.timelog.dto.request.TimelogRequestDto;
import com.a401.backend.domain.timelog.dto.response.TimelogResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.*;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TimelogServiceImpl implements TimelogService {

    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    @Override
    public TimelogResponseDto start(TimelogRequestDto request, Member member) {
        //로그 기록하기 전에 이루어져야 하는 작업
        //log를 탐색해서 최근 작업 중 endtime이 기록되지 않은 비정상 종료 데이터에 endtime을 현재 시간으로
        Timelog prevLog = timelogRepository.findByMember(member.getId());

        if (prevLog != null && prevLog.getEndTime() == null) {
            finishing(prevLog,member);
        }

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
    @Transactional
    public void finish(TimelogRequestDto request, Member member) {
        Optional<Timelog> prevLog = timelogRepository.findById(request.getTimelogId());

        // TODO: 2022-11-14 만약 timelog가 없다면 Throw Error
        finishing(prevLog.get(), member);
    }

    public void finishing(Timelog timelog, Member member) {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
//        로컬환경 시간 넘어갈 때 환경 테스트 용도
//        LocalDateTime now = LocalDateTime.of(2022,11,10,0,10,10);
        LocalDate date = now.toLocalDate();
        LocalTime endTime = now.toLocalTime();

        Duration duration = Duration.between(timelog.getStartTime(), endTime);
        long dif = duration.getSeconds();


        if (timelog.getSubject() != null) { // 일반 수능
            //만약 날짜가 넘어갔다면
            if (!timelog.getDate().equals(date)) {
                //이전 날짜 todo endtime 업데이트
                timelog.update(LocalTime.of(0, 0, 0));

                //다음 날짜 처리
                Timelog tomorrow = Timelog.builder()
                        .subject(timelog.getSubject())
                        .date(date)
                        .member(member)
                        .startTime(LocalTime.of(0, 0, 0))
                        .endTime(endTime)
                        .build();

                timelogRepository.save(tomorrow);

            } else {
                timelog.update(endTime);
            }
        } else if (timelog.getTodoitem() != null) { //todo
            TodoItem todo = timelog.getTodoitem();
//            Optional<TodoItem> todo = todoItemRepository.findById(timelog.getTodoitem());

            // TODO: 2022-11-14 todo 연결이 잘 되어 있는지 확인하고 만약 todo가 없다면 Throw Error

            TodoItem saveTodo = TodoItem.builder()
                    .id(todo.getId())
                    .complete(true)
                    .content(todo.getContent())
                    .subject(todo.getSubject())
                    .todolist(todo.getTodolist())
                    .time(todo.getTime() + dif)
                    .build();

            todoItemRepository.save(saveTodo);

            //만약 날짜가 넘어갔다면
            if (!timelog.getDate().equals(date)) {

                //이전 날짜 처리
                timelog.update(LocalTime.of(0, 0, 0));

                //다음 날짜 처리
                Timelog tomorrow = Timelog.builder()
                        .todoitem(todo)
                        .date(date)
                        .member(member)
                        .startTime(LocalTime.of(0, 0, 0))
                        .endTime(endTime)
                        .build();

                timelogRepository.save(tomorrow);
            } else {
                timelog.update(endTime);
            }
        }

    }

    public List<Timelog> getTimeLogList(Member member) {
        return timelogRepository.findAllByMemberAndEndTimeIsNull(member);
    }

    @Override
    @Transactional
    public void finishTimelogs(Member member) {
        List<Timelog> timelogList = timelogRepository.findAllByMemberAndEndTimeIsNull(member);
        for (Timelog t : timelogList) {
            finishing(t, member);
        }
    }
}
