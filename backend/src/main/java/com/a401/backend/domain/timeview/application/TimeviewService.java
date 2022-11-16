package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.dto.response.MinuteviewResponseDto;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface TimeviewService {
    MinuteviewResponseDto date(Member member, LocalDate date);
    MinuteviewResponseDto today(Member member, LocalDate date);
    MinuteviewResponseDto month(Member member, String date);
    MinuteviewResponseDto year(Member member, String date);
    List<MinuteviewResponseDto> days(Member member, String start, String end);
}
