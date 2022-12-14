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

    private LocalTime KOREAN = LocalTime.of(0,0,0);
    private LocalTime MATH = LocalTime.of(0,0,0);
    private LocalTime ENGLISH = LocalTime.of(0,0,0);
    private LocalTime KOREANHISTORY = LocalTime.of(0,0,0);
    private LocalTime SUB1 = LocalTime.of(0,0,0);
    private LocalTime SUB2 = LocalTime.of(0,0,0);
    private LocalTime LANGUAGE = LocalTime.of(0,0,0);
    private LocalTime ETC = LocalTime.of(0,0,0);

    public TimeviewResponseDto viewToDto(TimeviewDaily tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        response.KOREAN = timeFormatter(tv.getKorean());
        response.MATH = timeFormatter(tv.getMath());
        response.ENGLISH = timeFormatter(tv.getEnglish());
        response.KOREANHISTORY = timeFormatter(tv.getKoreanhistory());
        response.SUB1 = timeFormatter(tv.getSub1());
        response.SUB2 = timeFormatter(tv.getSub2());
        response.LANGUAGE = timeFormatter(tv.getLanguage());
        response.ETC = timeFormatter(tv.getEtc());

        return response;
    }

    public TimeviewResponseDto viewToDto(TimeviewMonthly tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        response.KOREAN = timeFormatter(tv.getKorean());
        response.MATH = timeFormatter(tv.getMath());
        response.ENGLISH = timeFormatter(tv.getEnglish());
        response.KOREANHISTORY = timeFormatter(tv.getKoreanhistory());
        response.SUB1 = timeFormatter(tv.getSub1());
        response.SUB2 = timeFormatter(tv.getSub2());
        response.LANGUAGE = timeFormatter(tv.getLanguage());
        response.ETC = timeFormatter(tv.getEtc());

        return response;
    }

    public TimeviewResponseDto viewToDto(TimeviewYearly tv) {
        TimeviewResponseDto response = new TimeviewResponseDto();
        response.KOREAN = timeFormatter(tv.getKorean());
        response.MATH = timeFormatter(tv.getMath());
        response.ENGLISH = timeFormatter(tv.getEnglish());
        response.KOREANHISTORY = timeFormatter(tv.getKoreanhistory());
        response.SUB1 = timeFormatter(tv.getSub1());
        response.SUB2 = timeFormatter(tv.getSub2());
        response.LANGUAGE = timeFormatter(tv.getLanguage());
        response.ETC = timeFormatter(tv.getEtc());

        return response;
    }

    public void update(Subject subject, long time) {
        switch(subject) {
            case KOREAN :
                this.KOREAN = this.KOREAN.plusSeconds(time);
                break;
            case MATH :
                this.MATH = this.MATH.plusSeconds(time);
                break;
            case ENGLISH :
                this.ENGLISH = this.ENGLISH.plusSeconds(time);
                break;
            case KOREANHISTORY :
                this.KOREANHISTORY = this.KOREANHISTORY.plusSeconds(time);
                break;
            case SUB1 :
                this.SUB1 = this.SUB1.plusSeconds(time);
                break;
            case SUB2 :
                this.SUB2 = this.SUB2.plusSeconds(time);
                break;
            case LANGUAGE :
                this.LANGUAGE = this.LANGUAGE.plusSeconds(time);
                break;
            case ETC :
                this.ETC = this.ETC.plusSeconds(time);
                break;
        }
    }
}
