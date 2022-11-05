package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.dday.dao.DdayRepository;
import com.a401.backend.domain.dday.domain.Dday;
import com.a401.backend.domain.dday.dto.request.DdayRequestDto;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class DdayServiceImpl implements DdayService {

    private final DdayRepository ddayRepository;

    @Override
    public List<DdayResponseDto> callDday(Member member) {
        List<Dday> ddayList = ddayRepository.findDdayIdAndDdayTitleAndDdayDateByMemberId(member.getId());
        List<DdayResponseDto> response = new ArrayList<>();

        for(Dday dday : ddayList) {
            DdayResponseDto dto = DdayResponseDto.builder()
                    .dday(dday)
                    .build();
            response.add(dto);
        }

        return response;
    }

    @Override
    public void saveDday(DdayRequestDto request, Member member) {
        Dday dday = Dday.builder()
                .ddayTitle(request.getDdayTitle())
                .ddayDate(request.getDdayDate())
                .member(member)
                .build();

        ddayRepository.save(dday);
    }

    @Override
    public void modifyDday(DdayRequestDto request, Member member) {
        Dday dday = ddayRepository.findByDdayId(request.getDdayId());

        Dday newDday = Dday.builder()
                .ddayId(dday.getDdayId())
                .ddayTitle(request.getDdayTitle())
                .ddayDate(request.getDdayDate())
                .member(member)
                .build();

        ddayRepository.save(newDday);
    }

    @Override
    public boolean removeDday(DdayRequestDto request, Member member) {
        Dday dday = ddayRepository.findByDdayId(request.getDdayId());
        if (dday.getMember().getId() != member.getId()) {
            return false;
        }
        ddayRepository.deleteById(request.getDdayId());
        return true;
    }
}
