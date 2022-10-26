package com.a401.backend.domain.Room.domain;

import com.a401.backend.domain.model.BgmCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roomId;

    // 멤버에 manytoone 걸어야함
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "MEMBER_ID")
    private long ownerId;

    private String roomTitle;
    private String roomUrl;

    @Enumerated(EnumType.STRING)
    private BgmCategory roomCategory;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean activate;

    @Builder
    public Room(long ownerId, String roomTitle, String roomUrl, BgmCategory roomCategory,
                LocalDateTime startTime, LocalDateTime endTime, boolean activate) {
        this.ownerId = ownerId;
        this.roomTitle = roomTitle;
        this.roomUrl = roomUrl;
        this.roomCategory = roomCategory;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activate = activate;
    }
    public static Room of(long ownerId, String roomTitle, String roomUrl, BgmCategory roomCategory,
                          LocalDateTime startTime, LocalDateTime endTime, boolean activeRoom) {
        return Room.builder()
                .ownerId(ownerId)
                .roomTitle(roomTitle)
                .roomUrl(roomUrl)
                .roomCategory(roomCategory)
                .startTime(startTime)
                .endTime(null)
                .build();
    }
}