package com.a401.backend.domain.TodoList.domain;

import com.a401.backend.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// 기본 생성자의 접근 제어를 public 으로 하면 무분별하게 객체를 생성할 수 있다. 물론 해도 되지만
// set멤버필드 하나만 빼먹어도 에러가 나기 때문에 protected를 해줘서 무분별하게 객체를 생성하는 거에 대한 체크를 한번 더 한다.
public class TodoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TODOLIST_ID")
    private Long id;

    @NotNull
    @DateTimeFormat(pattern = "yyyyMMdd")
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public TodoList(Long id, LocalDate date, Member member) {
        this.id = id;
        this.date = date;
        this.member = member;
    }
}
