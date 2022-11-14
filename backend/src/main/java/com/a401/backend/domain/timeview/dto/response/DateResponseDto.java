package com.a401.backend.domain.timeview.dto.response;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Setter
@Getter
@NoArgsConstructor
public class DateResponseDto {

    private LocalTime KOREAN = LocalTime.of(0,0,0);
    private LocalTime MATH = LocalTime.of(0,0,0);
    private LocalTime ENGLISH = LocalTime.of(0,0,0);
    private LocalTime KOREANHISTORY = LocalTime.of(0,0,0);
    private LocalTime SUB1 = LocalTime.of(0,0,0);
    private LocalTime SUB2 = LocalTime.of(0,0,0);
    private LocalTime LANGUAGE = LocalTime.of(0,0,0);
    private LocalTime ETC = LocalTime.of(0,0,0);

    @Builder
    public DateResponseDto(TimeviewDaily tv) {
        this.KOREAN = timeFormatter(tv.getKorean());
        this.MATH = timeFormatter(tv.getMath());
        this.ENGLISH = timeFormatter(tv.getEnglish());
        this.KOREANHISTORY = timeFormatter(tv.getKoreanhistory());
        this.SUB1 = timeFormatter(tv.getSub1());
        this.SUB2 = timeFormatter(tv.getSub2());
        this.LANGUAGE = timeFormatter(tv.getLanguage());
        this.ETC = timeFormatter(tv.getEtc());
    }

    public LocalTime timeFormatter(long raw) {
        int hour = (int) (raw/3600);
        int min = (int) (raw/60-hour*60);
        int sec = (int) (raw-hour*3600-min*60);
        return LocalTime.of(hour, min, sec);
    }

}
