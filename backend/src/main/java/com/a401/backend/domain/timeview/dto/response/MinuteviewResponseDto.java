package com.a401.backend.domain.timeview.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.a401.backend.global.util.TimeUtils.minuteFormatter;

@Setter
@Getter
@NoArgsConstructor
public class MinuteviewResponseDto {
    private long[] times = new long[8];

    public MinuteviewResponseDto viewToMinute(TimeviewResponseDto tv) {
        MinuteviewResponseDto response = new MinuteviewResponseDto();
        response.times[0] = minuteFormatter(tv.getKOREAN());
        response.times[1] = minuteFormatter(tv.getMATH());
        response.times[2] = minuteFormatter(tv.getENGLISH());
        response.times[3] = minuteFormatter(tv.getKOREANHISTORY());
        response.times[4] = minuteFormatter(tv.getSUB1());
        response.times[5] = minuteFormatter(tv.getSUB2());
        response.times[6] = minuteFormatter(tv.getLANGUAGE());
        response.times[7] = minuteFormatter(tv.getETC());

        return response;
    }
}
