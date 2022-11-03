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
    public void saveBackgroundLike(BackgroundLikeRegistRequestDto background, Member member) {
        Background bg = backgroundRepository.findBackgroundByBgId(background.getBgId());

        BackgroundLike bglike = BackgroundLike.builder()
                .member(member)
                .background(bg)
                .build();

        backgroundLikeRepository.save(bglike);
    }

    @Override
    public BackgroundResponseDto getRandomBg(BackgroundCategory category) {
        Background bg = backgroundRepository.findBackgroundByCategory(category.toString());
        ModelMapper modelMapper = new ModelMapper();
        BackgroundResponseDto bgDto = modelMapper.map(bg,BackgroundResponseDto.class);
        return bgDto;
    }
}
