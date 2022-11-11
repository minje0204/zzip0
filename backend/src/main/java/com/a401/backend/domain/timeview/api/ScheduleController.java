package com.a401.backend.domain.timeview.api;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.Subject;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.a401.backend.domain.timeview.dao.TimeviewDailyRepository;
import com.a401.backend.domain.timeview.dao.TimeviewMonthlyRepository;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.*;
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
    private final TimeviewMonthlyRepository timeviewMonthlyRepository;
    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    //스케줄러 사용을 위해 method에 추가
    //local test를 하려면 cron 표현식을 수정해서 사용하세요.
    @Scheduled(cron = "1 0 0 * * ?")
    public void dailyViewCron() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

        LocalDate date = now.toLocalDate().minusDays(1);
        //local test를 하려면 상단 코드를 주석처리하고 하단 코드를 사용하세요.
//        LocalDate date = now.toLocalDate();

        List<Member> memberList = memberRepository.findAll();

        for (Member m : memberList) {
            Optional<List<Timelog>> itemList = timelogRepository.findAllByMemberIdAndDate(m.getId(), now.toLocalDate());

            for (Timelog log : itemList.get()) {
                //endtime값이 있어야 다음 코드 실행
                if (log.getEndTime() != null) {
                    Duration duration = Duration.between(log.getStartTime(),log.getEndTime());
                    long dif = duration.getSeconds();

                    if (dif<0) {
                        dif += 86400;
                    }
//                시:분:초 계산용
//                int hour = (int) (dif/3600);
//                int min = (int) (dif/60-hour*60);
//                int sec = (int) (dif-hour*3600-min*60);
//
//                LocalTime time = LocalTime.of(hour, min, sec);

                    Subject subject = null;
                    //NORMAL 타입이라면 subject를 직접 지정
                    if (log.getTodoitem() == null) {
                        subject = log.getSubject();
                    } else { //TODO 타입이라면 todoitem으로부터 subject를 가져옴
                        Optional<TodoItem> item = todoItemRepository.findByTodoitem(log.getTodoitem().getId());
                        subject = item.get().getSubject();
                    }

                    //기존에 테이블에 등록된 항목이라면
                    if (timeviewDailyRepository.countByData(m.getId(),date,subject.toString())==1) {
                        //이 더러운 코드 수정해야됨..,....
                        Optional<TimeviewDaily> tv = timeviewDailyRepository.findByData(m.getId(),date,subject.toString());
                        TimeviewDaily daily = TimeviewDaily.builder()
                                .dailyId(tv.get().getDailyId())
                                .member(m)
                                .date(date)
                                .subject(subject)
                                .time(tv.get().getTime()+dif)
                                .build();
                        timeviewDailyRepository.save(daily);

                    } else {
                        TimeviewDaily daily = TimeviewDaily.builder()
                                .member(m)
                                .date(date)
                                .subject(subject)
                                .time(dif)
                                .build();
                        timeviewDailyRepository.save(daily);
                    }
                }
            }
        }
    }

    @Scheduled(cron = "0 0 1 1 * ?")
    public void monthlyViewCron() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

        LocalDate date_now = now.toLocalDate().minusMonths(1);
        //local test를 하려면 상단 코드를 주석처리하고 하단 코드를 사용하세요.
//        LocalDate date_now = now.toLocalDate();
        String year = Integer.toString(date_now.getYear());
        String month = Integer.toString(date_now.getMonthValue());
        int date = Integer.parseInt(year+month);

        List<Member> memberList = memberRepository.findAll();

        for (Member m : memberList) {
            Optional<List<TimeviewDaily>> itemList = timeviewDailyRepository.findAllByMemberId(m.getId());

            for (TimeviewDaily item : itemList.get()) {
                Subject subject = item.getSubject();

                //기존에 테이블에 등록된 항목이라면
                if (timeviewMonthlyRepository.countByMemberIdAndSubject(m.getId(),date,subject.toString())==1) {
                    //이 더러운 코드 수정해야됨..,....
                    Optional<TimeviewMonthly> tv = timeviewMonthlyRepository.findByData(m.getId(),date,subject.toString());
                    TimeviewMonthly monthly = TimeviewMonthly.builder()
                            .monthlyId(tv.get().getMonthlyId())
                            .member(m)
                            .date(date)
                            .subject(subject)
                            .time(tv.get().getTime()+item.getTime())
                            .build();
                    timeviewMonthlyRepository.save(monthly);

                } else {
                    TimeviewMonthly monthly = TimeviewMonthly.builder()
                            .member(m)
                            .date(date)
                            .subject(subject)
                            .time(item.getTime())
                            .build();
                    timeviewMonthlyRepository.save(monthly);
                }
            }
        }
    }
}
