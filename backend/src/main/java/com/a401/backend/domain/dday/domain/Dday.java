package com.a401.backend.domain.dday.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memoId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private String memoData;

    @Builder
    public Dday(long memoId, Member member, String memoData) {
        this.memoId = memoId;
        this.member = member;
        this.memoData = memoData;
    }

}
