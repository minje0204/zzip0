package com.a401.backend.domain.timeview.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeviewMonthly {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long monthlyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private int date;
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
    public TimeviewMonthly(long monthlyId, Member member, int date, long korean, long math, long english,
                         long koreanhistory, long sub1, long sub2, long language, long etc) {
        this.monthlyId = monthlyId;
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

    public void update(TimeviewDaily tv) {
        this.korean += tv.getKorean();
        this.math += tv.getMath();
        this.english += tv.getEnglish();
        this.koreanhistory += tv.getKoreanhistory();
        this.sub1 += tv.getSub1();
        this.sub2 += tv.getSub2();
        this.language += tv.getLanguage();
        this.etc += tv.getEtc();
    }
}
