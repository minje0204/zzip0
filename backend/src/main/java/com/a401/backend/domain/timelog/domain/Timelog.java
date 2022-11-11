package com.a401.backend.domain.timelog.domain;

import com.a401.backend.domain.TodoItem.domain.TodoItem;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.Subject;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

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
    @Enumerated(EnumType.STRING)
    private Subject subject;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @NotNull
    private LocalDate date;
    @NotNull
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    @Builder
    public Timelog(long timelogId, TodoItem todoitem, Subject subject, Member member, LocalDate date,
                   LocalTime startTime, LocalTime endTime) {
        this.timelogId = timelogId;
        this.todoitem = todoitem;
        this.subject = subject;
        this.member = member;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
