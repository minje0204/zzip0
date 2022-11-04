package com.a401.backend.domain.dday.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ddayId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private String ddayTitle;
    @NotNull
    private LocalDate ddayDate;

    @Builder
    public Dday(long ddayId, Member member, String ddayTitle, LocalDate ddayDate) {
        this.ddayId = ddayId;
        this.member = member;
        this.ddayTitle = ddayTitle;
        this.ddayDate = ddayDate;
    }

}
