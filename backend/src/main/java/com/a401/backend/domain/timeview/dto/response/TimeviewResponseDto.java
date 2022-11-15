package com.a401.backend.domain.timeview.dto.response;

import com.a401.backend.domain.model.Subject;
import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import com.a401.backend.domain.timeview.domain.TimeviewYearly;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import static com.a401.backend.global.util.TimeUtils.timeFormatter;

@Setter
@Getter
@NoArgsConstructor
public class TimeviewResponseDto {
    private long[] times = new long[8];

    public TimeviewResponseDto viewToDto(TimeviewDaily tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        response.times[0] = tv.getKorean()/60;
        response.times[1] = tv.getMath()/60;
        response.times[2] = tv.getEnglish()/60;
        response.times[3] = tv.getKoreanhistory()/60;
        response.times[4] = tv.getSub1()/60;
        response.times[5] = tv.getSub2()/60;
        response.times[6] = tv.getLanguage()/60;
        response.times[7] = tv.getEtc()/60;

        return response;
    }

    public TimeviewResponseDto viewToDto(TimeviewMonthly tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        response.times[0] = tv.getKorean()/60;
        response.times[1] = tv.getMath()/60;
        response.times[2] = tv.getEnglish()/60;
        response.times[3] = tv.getKoreanhistory()/60;
        response.times[4] = tv.getSub1()/60;
        response.times[5] = tv.getSub2()/60;
        response.times[6] = tv.getLanguage()/60;
        response.times[7] = tv.getEtc()/60;

        return response;
    }

    public TimeviewResponseDto viewToDto(TimeviewYearly tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        response.times[0] = tv.getKorean()/60;
        response.times[1] = tv.getMath()/60;
        response.times[2] = tv.getEnglish()/60;
        response.times[3] = tv.getKoreanhistory()/60;
        response.times[4] = tv.getSub1()/60;
        response.times[5] = tv.getSub2()/60;
        response.times[6] = tv.getLanguage()/60;
        response.times[7] = tv.getEtc()/60;

        return response;
    }

    public void update(Subject subject, long time) {
        switch(subject) {
            case KOREAN :
                this.times[0] += time;
                break;
            case MATH :
                this.times[1] += time;
                break;
            case ENGLISH :
                this.times[2] += time;
                break;
            case KOREANHISTORY :
                this.times[3] += time;
                break;
            case SUB1 :
                this.times[4] += time;
                break;
            case SUB2 :
                this.times[5] += time;
                break;
            case LANGUAGE :
                this.times[6] += time;
                break;
            case ETC :
                this.times[7] += time;
                break;
        }
    }
}
