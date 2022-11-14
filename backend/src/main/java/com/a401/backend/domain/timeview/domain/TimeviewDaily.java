package com.a401.backend.domain.timeview.domain;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.Subject;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeviewDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dailyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private LocalDate date;
    @ColumnDefault("0")
    private long korean = 0;
    @ColumnDefault("0")
    private long math = 0;
    @ColumnDefault("0")
    private long english = 0;
    @ColumnDefault("0")
    private long koreanhistory = 0;
    @ColumnDefault("0")
    private long sub1 = 0;
    @ColumnDefault("0")
    private long sub2 = 0;
    @ColumnDefault("0")
    private long language = 0;
    @ColumnDefault("0")
    private long etc = 0;

    @Builder
    public TimeviewDaily(long dailyId, Member member, LocalDate date, long korean, long math, long english,
                         long koreanhistory, long sub1, long sub2, long language, long etc) {
        this.dailyId = dailyId;
        this.member = member;
        this.date = date;
        this.korean = korean;
        this.math = math;
        this.english = english;
        this.koreanhistory = koreanhistory;
        this.sub1 = sub1;
        this.sub2 = sub2;
        this.language = language;
        this.etc = etc;
    }

    public void update(Subject subject, long time) {
        switch(subject) {
            case KOREAN :
                this.korean += time;
                break;
            case MATH :
                this.math += time;
                break;
            case ENGLISH :
                this.english += time;
                break;
            case KOREANHISTORY :
                this.koreanhistory += time;
                break;
            case SUB1 :
                this.sub1 += time;
                break;
            case SUB2 :
                this.sub2 += time;
                break;
            case LANGUAGE :
                this.language += time;
                break;
            case ETC :
                this.etc += time;
                break;
        }
    }


}
