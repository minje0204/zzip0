package com.a401.backend.domain.room.domain;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.BackgroundCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member owner;

    private String roomTitle;

    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "org.hibernate.type.UUIDCharType")
    private UUID roomUrl = UUID.randomUUID();

    @Enumerated(EnumType.STRING)
    private BackgroundCategory roomCategory;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean activate;

    @Builder
    public Room(Member owner, String roomTitle, BackgroundCategory roomCategory,
                LocalDateTime startTime, LocalDateTime endTime, boolean activate) {
        this.owner = owner;
        this.roomTitle = roomTitle;
        this.roomCategory = roomCategory;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activate = activate;
    }

    public void update(Room room, LocalDateTime endTime, boolean activate) {
        this.owner = room.getOwner();
        this.roomTitle = room.getRoomTitle();
        this.roomCategory = room.getRoomCategory();
        this.startTime = room.getStartTime();
        this.endTime = endTime;
        this.activate = activate;
    }

}