package com.a401.backend.domain.timelog.domain;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Timelog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long timelogId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todoitem_id")
    private TodoItem todoitem;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    @Builder
    public Timelog(long timelogId, TodoItem todoitem, Member member, LocalDateTime startTime, LocalDateTime endTime) {
        this.timelogId = timelogId;
        this.todoitem = todoitem;
        this.member = member;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
