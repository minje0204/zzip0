package com.a401.backend.domain.noise.api;

import com.a401.backend.domain.noise.application.NoiseService;
import com.a401.backend.domain.noise.dto.response.NoiseResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/noise")
public class NoiseController {

    private final NoiseService nsService;

    @GetMapping ("")
    public ResponseEntity<?> noiseList() {

        try {
            List<NoiseResponseDto> nslist = nsService.callNoiseList();
            return new ResponseEntity<>(nslist, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

