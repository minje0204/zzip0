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
public class TimeviewMonthly {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long monthlyId;
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
    public TimeviewMonthly(long monthlyId, Member member, int date, Subject subject, long time) {
        this.monthlyId = monthlyId;
        this.member = member;
        this.date = date;
        this.subject = subject;
        this.time = time;
    }

}
