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
import com.a401.backend.domain.timeview.dto.response.MinuteviewResponseDto;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    public MinuteviewResponseDto date(Member member, LocalDate date) {
        Optional<TimeviewDaily> opt = dailyRepository.findByMemberIdAndDate(member.getId(), date.toString());

        TimeviewDaily item = opt.get();
        TimeviewResponseDto dto = new TimeviewResponseDto();
        MinuteviewResponseDto response = new MinuteviewResponseDto();

        return response.viewToMinute(dto.viewToDto(item));
    }

    @Override
    public MinuteviewResponseDto today(Member member, LocalDate date) {
        List<Timelog> itemList = timelogRepository.findAllByMemberIdAndDate(member.getId(), date).get();

        TimeviewResponseDto dto = new TimeviewResponseDto();

        for (Timelog log : itemList) {
            if (log.getEndTime() != null) {
                Duration duration = Duration.between(log.getStartTime(),log.getEndTime());
                long dif = duration.getSeconds();

                if (dif<0) {
                    dif += 86400;
                }

                Subject subject;
                //NORMAL ??????????????? subject??? ?????? ??????
                if (log.getTodoitem() == null) {
                    subject = log.getSubject();
                } else { //TODO ??????????????? todoitem???????????? subject??? ?????????
                    Optional<TodoItem> item = todoItemRepository.findByTodoitem(log.getTodoitem().getId());
                    subject = item.get().getSubject();
                }

                dto.update(subject,dif);
            }
        }

        MinuteviewResponseDto response = new MinuteviewResponseDto();

        return response.viewToMinute(dto);
    }

    @Override
    public MinuteviewResponseDto month(Member member, String date) {
        LocalDate now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDate();
        String year = Integer.toString(now.getYear());
        String month = Integer.toString(now.getMonthValue());
        String nowDate = year+month;

        //????????? ????????? ?????? ?????? ?????? view??? ?????? ????????? ???????????? return?????? ???
        if(nowDate.equals(date)) {
            MinuteviewResponseDto mdto = new MinuteviewResponseDto();

            //????????? 1?????? ???????????? 1????????? yesterday?????? ???????????? ?????? ????????? ????????? ???
            if (now.getDayOfMonth()>1) {
                LocalDate yesterday = now.minusDays(1);
                LocalDate firstDay = LocalDate.of(yesterday.getYear(), yesterday.getMonthValue(), 1);

                Optional<List<TimeviewDaily>> opt = dailyRepository.findListByMemberIdAndStartAndEnd(member.getId(), firstDay, yesterday);

                for (TimeviewDaily item : opt.get()) {
                    TimeviewResponseDto dto = new TimeviewResponseDto();
                    mdto.update(dto.viewToDto(item));
                }
            }

            //????????? today??? ?????? ????????? return
            mdto.update(today(member,now));

            return mdto;
        } else {
            Optional<TimeviewMonthly> opt = monthlyRepository.findByMemberIdAndDate(member.getId(), date);

            TimeviewMonthly item = opt.get();
            TimeviewResponseDto dto = new TimeviewResponseDto();
            MinuteviewResponseDto response = new MinuteviewResponseDto();

            return response.viewToMinute(dto.viewToDto(item));
        }
    }

    @Override
    public MinuteviewResponseDto year(Member member, String date) {
        LocalDate now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDate();
        String year = Integer.toString(now.getYear());

        //????????? ????????? ????????? ?????? view??? ?????? ????????? ???????????? return?????? ???
        if(year.equals(date)) {
            MinuteviewResponseDto mdto = new MinuteviewResponseDto();

            //????????? 1?????? ???????????? 1????????? ??????????????? ???????????? ?????? ????????? ????????? ???
            if (now.getMonthValue()>1) {
                LocalDate yesterday = now.minusDays(1);
                String endMonth = Integer.toString(yesterday.getYear())+Integer.toString(yesterday.getMonthValue());
                String startMonth = Integer.toString(yesterday.getYear())+"01";

                Optional<List<TimeviewMonthly>> optMonth = monthlyRepository.findListByMemberIdAndStartAndEnd(member.getId(), startMonth, endMonth);

                for (TimeviewMonthly item : optMonth.get()) {
                    TimeviewResponseDto dto = new TimeviewResponseDto();
                    mdto.update(dto.viewToDto(item));
                }
            }

            //????????? ?????? ?????? ?????? ??????
            //????????? 1?????? ???????????? 1????????? yesterday?????? ???????????? ?????? ????????? ????????? ???
            if (now.getDayOfMonth()>1) {
                LocalDate yesterday = now.minusDays(1);
                LocalDate firstDay = LocalDate.of(yesterday.getYear(), yesterday.getMonthValue(), 1);

                Optional<List<TimeviewDaily>> opt = dailyRepository.findListByMemberIdAndStartAndEnd(member.getId(), firstDay, yesterday);

                for (TimeviewDaily item : opt.get()) {
                    TimeviewResponseDto dto = new TimeviewResponseDto();
                    mdto.update(dto.viewToDto(item));
                }
            }

            //????????? today??? ?????? ????????? return
            mdto.update(today(member,now));

            return mdto;
        } else {
            Optional<TimeviewYearly> opt = yearlyRepository.findByMemberIdAndDate(member.getId(), date);

            TimeviewYearly item = opt.get();
            TimeviewResponseDto dto = new TimeviewResponseDto();
            MinuteviewResponseDto response = new MinuteviewResponseDto();

            return response.viewToMinute(dto.viewToDto(item));
        }
    }

    @Override
    public List<MinuteviewResponseDto> days(Member member, String start, String end) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate parsedStart = LocalDate.parse(start, formatter);
        LocalDate parsedEnd = LocalDate.parse(end, formatter);
        Optional<List<TimeviewDaily>> opt = dailyRepository.findListByMemberIdAndStartAndEnd(member.getId(), parsedStart, parsedEnd);

        List<MinuteviewResponseDto> response = new ArrayList<>();

        for (TimeviewDaily item : opt.get()) {
            TimeviewResponseDto dto = new TimeviewResponseDto();
            MinuteviewResponseDto mdto = new MinuteviewResponseDto();
            response.add(mdto.viewToMinute(dto.viewToDto(item)));
        }

        return response;
    }
}
