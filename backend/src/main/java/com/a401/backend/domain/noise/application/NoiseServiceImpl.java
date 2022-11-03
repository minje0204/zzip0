package com.a401.backend.domain.noise.application;

import com.a401.backend.domain.noise.dao.NoiseRepository;
import com.a401.backend.domain.noise.domain.Noise;
import com.a401.backend.domain.noise.dto.response.NoiseResponseDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class NoiseServiceImpl implements NoiseService {

    private final NoiseRepository noiseRepository;

    @Override
    public List<NoiseResponseDto> callNoiseList() {
        List<Noise> noise = noiseRepository.findAll();

        ModelMapper modelMapper = new ModelMapper();
        List<NoiseResponseDto> noiseResponse = noise.stream()
                .map(m->modelMapper.map(m, NoiseResponseDto.class))
                .collect(Collectors.toList());

        return noiseResponse;
    }
}
