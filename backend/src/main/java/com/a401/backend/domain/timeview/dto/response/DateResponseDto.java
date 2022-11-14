package com.a401.backend.domain.timeview.dto.response;

import com.a401.backend.domain.model.Subject;
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

    private Subject subject;
    private LocalTime time;

//    @Builder
//    public DateResponseDto(TimeviewDaily tv) {
//        this.subject = tv.getSubject();
//
//        long raw = tv.getTime();
//        int hour = (int) (raw/3600);
//        int min = (int) (raw/60-hour*60);
//        int sec = (int) (raw-hour*3600-min*60);
//        this.time = LocalTime.of(hour, min, sec);
//    }

}
