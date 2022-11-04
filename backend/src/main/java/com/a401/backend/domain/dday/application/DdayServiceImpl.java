package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.dday.dao.DdayRepository;
import com.a401.backend.domain.dday.domain.Dday;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class DdayServiceImpl implements DdayService {

    private final DdayRepository ddayRepository;

    @Override
    public List<DdayResponseDto> callDday(Member member) {
        List<Dday> ddayList = ddayRepository.findDdayIdAndDdayTitleAndDdayDateByMemberId(member.getId());

        ModelMapper modelMapper = new ModelMapper();
        List<DdayResponseDto> response = ddayList.stream()
                .map(m->modelMapper.map(m, DdayResponseDto.class))
                .collect(Collectors.toList());

        return response;
    }
}
