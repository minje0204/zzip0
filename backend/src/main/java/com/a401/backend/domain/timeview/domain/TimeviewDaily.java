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
    @NotNull
    @Enumerated(EnumType.STRING)
    private Subject subject;
    @ColumnDefault("0")
    private long time = 0;

    @Builder
    public TimeviewDaily(long dailyId, Member member, LocalDate date, Subject subject, long time) {
        this.dailyId = dailyId;
        this.member = member;
        this.date = date;
        this.subject = subject;
        this.time = time;
    }

}
