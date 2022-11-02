package com.a401.backend.domain.background.domain;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.BackgroundCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BackgroundLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bglikeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BACKGROUND_BGID")
    private Background bgId;

    @Builder
    public BackgroundLike(long bglikeId, Member memberId, Background bgId) {
        this.bglikeId = bglikeId;
        this.memberId = memberId;
        this.bgId = bgId;
    }

}
