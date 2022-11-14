package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.dao.TimeviewDailyRepository;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.dto.response.DateResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimeviewServiceImpl implements TimeviewService {

    private final TimeviewDailyRepository dailyRepository;

    @Override
    public List<DateResponseDto> date(Member member, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate parsedDate = LocalDate.parse(date, formatter);
        Optional<List<TimeviewDaily>> itemList = dailyRepository.findAllByMemberIdAndDate(member.getId(), parsedDate);

        List<DateResponseDto> response = new ArrayList<>();
        
        for (TimeviewDaily item : itemList.get()) {
            DateResponseDto dto = DateResponseDto.builder()
                    .tv(item)
                    .build();

            response.add(dto);
        }

        return response;
    }
}
