package com.a401.backend.domain.room.domain;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.member.domain.Member;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "BG_ID")
    private Background background;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean activate;

    @Builder
    public Room(Member owner, String roomTitle, Background background,
                LocalDateTime startTime, LocalDateTime endTime, boolean activate) {
        this.owner = owner;
        this.roomTitle = roomTitle;
        this.background = background;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activate = activate;
    }

    public void update(Room room, LocalDateTime endTime, boolean activate) {
        this.owner = room.getOwner();
        this.roomTitle = room.getRoomTitle();
        this.background = room.getBackground();
        this.startTime = room.getStartTime();
        this.endTime = endTime;
        this.activate = activate;
    }

}