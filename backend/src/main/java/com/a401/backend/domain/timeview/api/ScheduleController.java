package com.a401.backend.domain.timeview.api;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.a401.backend.domain.timeview.dao.TimeviewDailyRepository;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component //스케줄러 사용을 위해 class에 추가
@EnableAsync
@Service
@RequiredArgsConstructor
public class ScheduleController {

    private final MemberRepository memberRepository;
    private final TimeviewDailyRepository timeviewDailyRepository;
    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    //스케줄러 사용을 위해 method에 추가
    @Scheduled(cron = "25 46 9 * * ?")
    public void dailyViewCron() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
//        LocalDate date = now.toLocalDate().minusDays(1);
        LocalDate date = now.toLocalDate();
        List<Member> memberList = memberRepository.findAll();

        for (Member m : memberList) {
            Optional<List<Timelog>> itemList = timelogRepository.findAllByMemberIdAndDate(m.getId(), now.toLocalDate());

            for (Timelog log : itemList.get()) {
                Optional<TodoItem> item = todoItemRepository.findByTodoitem(log.getTodoitem().getId());

                long dif = log.getEndTime().getSecond() - log.getStartTime().getSecond();
                System.out.println(item.get().getSubject().toString());
                System.out.println(item.get().getSubject().getClass().getName());

                //기존에 테이블에 등록된 항목이라면
                if (timeviewDailyRepository.countByData(m.getId(),date,item.get().getSubject())==1) {
                    //이 더러운 코드 수정해야됨..,....
                    Optional<TimeviewDaily> tv = timeviewDailyRepository.findByData(m.getId(),date,item.get().getSubject());
                    //현재 subject enum타입 받으면서 오류생김
                    TimeviewDaily daily = TimeviewDaily.builder()
                            .dailyId(tv.get().getDailyId())
                            .member(m)
                            .date(date)
                            .subject(item.get().getSubject())
                            .time(tv.get().getTime()+dif)
                            .build();
                    timeviewDailyRepository.save(daily);

                } else {
                    TimeviewDaily daily = TimeviewDaily.builder()
                            .member(m)
                            .date(date)
                            .subject(item.get().getSubject())
                            .time(dif)
                            .build();
                    timeviewDailyRepository.save(daily);
                }
            }
        }
    }
}
