package com.a401.backend.TodoItem.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// 기본 생성자의 접근 제어를 public 으로 하면 무분별하게 객체를 생성할 수 있다. 물론 해도 되지만
// set멤버필드 하나만 빼먹어도 에러가 나기 때문에 protected를 해줘서 무분별하게 객체를 생성하는 거에 대한 체크를 한번 더 한다.
public class Todolist {

    @Id
    @GeneratedValue
    @Column(name = "TODOLIST_ID")
    private Long id;

    @NotNull
    private LocalDateTime date;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="MEMBER_ID")
//    private Member member;

    @Builder
    public Todolist(LocalDateTime date){
        this.date = date;
    }

}
