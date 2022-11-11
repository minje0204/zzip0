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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeviewYearly {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long yearlyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private int date;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Subject subject;
    @ColumnDefault("0")
    private long time = 0;

    @Builder
    public TimeviewYearly(long yearlyId, Member member, int date, Subject subject, long time) {
        this.yearlyId = yearlyId;
        this.member = member;
        this.date = date;
        this.subject = subject;
        this.time = time;
    }

}
