package com.a401.backend.domain.timeview.dto.response;

import com.a401.backend.domain.dday.domain.Dday;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
public class DateResponseDto {

    private long ddayId;
    private String ddayTitle;
    private LocalDate ddayDate;

    @Builder
    public DateResponseDto(Dday dday) {
        this.ddayId = dday.getDdayId();
        this.ddayTitle = dday.getDdayTitle();
        this.ddayDate = dday.getDdayDate();
    }

}
