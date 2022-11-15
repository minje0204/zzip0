package com.a401.backend.global.util;

import java.time.LocalTime;

public class TimeUtils {

    public static LocalTime timeFormatter(long raw) {
        int hour = (int) (raw/3600);
        int min = (int) (raw/60-hour*60);
        int sec = (int) (raw-hour*3600-min*60);
        return LocalTime.of(hour, min, sec);
    }

    public static long minuteFormatter(LocalTime raw) {
        int year = raw.getHour();
        int min = raw.getMinute();

        return year*60+min;
    }

}

