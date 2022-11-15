package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.TodoItem.repository.TodoItemRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.Subject;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timelog.domain.Timelog;
import com.a401.backend.domain.timeview.dao.TimeviewDailyRepository;
import com.a401.backend.domain.timeview.dao.TimeviewMonthlyRepository;
import com.a401.backend.domain.timeview.dao.TimeviewYearlyRepository;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import com.a401.backend.domain.timeview.domain.TimeviewYearly;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimeviewServiceImpl implements TimeviewService {

    private final TimeviewDailyRepository dailyRepository;
    private final TimeviewMonthlyRepository monthlyRepository;
    private final TimeviewYearlyRepository yearlyRepository;
    private final TimelogRepository timelogRepository;
    private final TodoItemRepository todoItemRepository;

    @Override
    public TimeviewResponseDto date(Member member, LocalDate date) {
        Optional<TimeviewDaily> opt = dailyRepository.findByMemberIdAndDate(member.getId(), date.toString());

        TimeviewDaily item = opt.get();
        TimeviewResponseDto response = new TimeviewResponseDto();

        return response.viewToDto(item);
    }

    @Override
    public TimeviewResponseDto today(Member member, LocalDate date) {
        List<Timelog> itemList = timelogRepository.findAllByMemberIdAndDate(member.getId(), date).get();

        TimeviewResponseDto response = new TimeviewResponseDto();

        for (Timelog log : itemList) {
            if (log.getEndTime() != null) {
                Duration duration = Duration.between(log.getStartTime(),log.getEndTime());
                long dif = duration.getSeconds();

                if (dif<0) {
                    dif += 86400;
                }

                Subject subject;
                //NORMAL 타입이라면 subject를 직접 지정
                if (log.getTodoitem() == null) {
                    subject = log.getSubject();
                } else { //TODO 타입이라면 todoitem으로부터 subject를 가져옴
                    Optional<TodoItem> item = todoItemRepository.findByTodoitem(log.getTodoitem().getId());
                    subject = item.get().getSubject();
                }

                response.update(subject,dif);
            }
        }

        return response;
    }

    @Override
    public TimeviewResponseDto month(Member member, String date) {
        Optional<TimeviewMonthly> opt = monthlyRepository.findByMemberIdAndDate(member.getId(), date);

        TimeviewMonthly item = opt.get();
        TimeviewResponseDto response = new TimeviewResponseDto();

        return response.viewToDto(item);
    }

    @Override
    public TimeviewResponseDto year(Member member, String date) {
        Optional<TimeviewYearly> opt = yearlyRepository.findByMemberIdAndDate(member.getId(), date);

        TimeviewYearly item = opt.get();
        TimeviewResponseDto response = new TimeviewResponseDto();

        return response.viewToDto(item);
    }

    @Override
    public List<TimeviewResponseDto> days(Member member, String start, String end) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate parsedStart = LocalDate.parse(start, formatter);
        LocalDate parsedEnd = LocalDate.parse(end, formatter);
        Optional<List<TimeviewDaily>> opt = dailyRepository.findListByMemberIdAndStartAndEnd(member.getId(), parsedStart, parsedEnd);

        List<TimeviewResponseDto> response = new ArrayList<TimeviewResponseDto>();

        for (TimeviewDaily item : opt.get()) {
            TimeviewResponseDto dto = new TimeviewResponseDto();
            response.add(dto.viewToDto(item));
        }

        return response;
    }
}
