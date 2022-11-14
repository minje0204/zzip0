package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.dao.TimeviewDailyRepository;
import com.a401.backend.domain.timeview.dao.TimeviewMonthlyRepository;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimeviewServiceImpl implements TimeviewService {

    private final TimeviewDailyRepository dailyRepository;
    private final TimeviewMonthlyRepository monthlyRepository;

    @Override
    public TimeviewResponseDto date(Member member, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate parsedDate = LocalDate.parse(date, formatter);
        Optional<TimeviewDaily> opt = dailyRepository.findByMemberIdAndDate(member.getId(), parsedDate.toString());

        TimeviewDaily item = opt.get();

        TimeviewResponseDto response = TimeviewResponseDto.builder()
                .tv(item)
                .build();
        return response;
    }

    @Override
    public TimeviewResponseDto month(Member member, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate parsedDate = LocalDate.parse(date, formatter);
        String year = Integer.toString(parsedDate.getYear());
        String month = Integer.toString(parsedDate.getMonthValue());
        String dateForm = year+"-"+month;

        Optional<TimeviewMonthly> opt = monthlyRepository.findByMemberIdAndDate(member.getId(), dateForm);

        TimeviewMonthly item = opt.get();

        TimeviewResponseDto response = TimeviewResponseDto.builder()
                .tv(item)
                .build();
        return response;
    }
}
