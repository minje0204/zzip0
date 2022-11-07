package com.a401.backend.domain.follow.domain;

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
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long followId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id")
    private Member followeeMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private Member followerMember;

    @Builder
    public Follow(long followId, Member followeeMember, Member followerMember) {
        this.followId = followId;
        this.followeeMember = followeeMember;
        this.followerMember = followerMember;
    }

}
