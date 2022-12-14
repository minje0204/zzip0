package com.a401.backend.domain.background.application;

import com.a401.backend.domain.background.dao.BackgroundLikeRepository;
import com.a401.backend.domain.background.dao.BackgroundRepository;
import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.background.domain.BackgroundLike;
import com.a401.backend.domain.background.dto.request.BackgroundLikeRegistRequestDto;
import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.BackgroundCategory;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class BackgroundServiceImpl implements BackgroundService{

    private final BackgroundRepository backgroundRepository;
    private final BackgroundLikeRepository backgroundLikeRepository;

    @Override
    public BackgroundResponseDto getBackground(Long bgId) {
        Background bg = backgroundRepository.findBackgroundByBgId(bgId);
        ModelMapper modelMapper = new ModelMapper();
        BackgroundResponseDto bgDto = modelMapper.map(bg,BackgroundResponseDto.class);

        return bgDto;
    }

    @Override
    public boolean saveBackgroundLike(BackgroundLikeRegistRequestDto background, Member member) {
        //이미 등록된 상태라면
        if (backgroundLikeRepository.countByBgIdAndMemberId(background.getBgId(), member.getId()) == 1) {
            return false;
        } else {
            Background bg = backgroundRepository.findBackgroundByBgId(background.getBgId());

            BackgroundLike bglike = BackgroundLike.builder()
                    .member(member)
                    .background(bg)
                    .build();

            backgroundLikeRepository.save(bglike);
            return true;
        }
    }

    @Override
    public void deleteBackgroundLike(BackgroundLikeRegistRequestDto background, Member member) {
        backgroundLikeRepository.deleteByBgAndMember(background.getBgId(), member.getId());
    }

    @Override
    public List<BackgroundResponseDto> callBackgroundLike(Member member) {
        List<Background> bglike = backgroundRepository.findbyMember(member.getId());

        ModelMapper modelMapper = new ModelMapper();
        List<BackgroundResponseDto> bglikeResponse = bglike.stream()
                .map(m->modelMapper.map(m, BackgroundResponseDto.class))
                .collect(Collectors.toList());

        return bglikeResponse;
    }

    @Override
    public List<BackgroundResponseDto> callThemeBackground(BackgroundCategory category) {
        List<Background> bglike = backgroundRepository.findAllByBgCategory(category);

        ModelMapper modelMapper = new ModelMapper();
        List<BackgroundResponseDto> bglikeResponse = bglike.stream()
                .map(m->modelMapper.map(m, BackgroundResponseDto.class))
                .collect(Collectors.toList());

        return bglikeResponse;
    }

    @Override
    public BackgroundResponseDto getRandomBg(BackgroundCategory category) {
        Background bg = backgroundRepository.findBackgroundByCategory(category.toString());
        ModelMapper modelMapper = new ModelMapper();
        BackgroundResponseDto bgDto = modelMapper.map(bg,BackgroundResponseDto.class);

        return bgDto;
    }
}
