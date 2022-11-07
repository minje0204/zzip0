package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dao.TimelogRepository;
import com.a401.backend.domain.timeview.dto.response.DateResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeviewServiceImpl implements TimeviewService {

    private final TimelogRepository tlRepository;

    @Override
    public DateResponseDto date(Member member, String date) {
        return null;
    }
}
