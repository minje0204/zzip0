package com.a401.backend.Follow.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Follow {
    @Id
    @GeneratedValue
    @Column(name = "FOLLOW_ID")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="MEMBER_ID")
//    private Member followee_id

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="MEMBER_ID")
//    private Member follower_id

}
