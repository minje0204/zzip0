package com.a401.backend.domain.background.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BackgroundLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bglikeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "background_bgId")
    private Background background;

    @Builder
    public BackgroundLike(long bglikeId, Member member, Background background) {
        this.bglikeId = bglikeId;
        this.member = member;
        this.background = background;
    }

}
