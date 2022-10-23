package com.a401.backend.TodoItem.domain;

import com.a401.backend.TodoList.domain.Todolist;
import com.a401.backend.TodoItem.dto.request.TodoitemRequestDto;
import com.a401.backend.global.enums.Subject;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// 기본 생성자의 접근 제어를 public 으로 하면 무분별하게 객체를 생성할 수 있다. 물론 해도 되지만
// set멤버필드 하나만 빼먹어도 에러가 나기 때문에 protected를 해줘서 무분별하게 객체를 생성하는 거에 대한 체크를 한번 더 한다.
public class Todoitem {

    @Id
    @GeneratedValue
    @Column(name = "TODOITEM_ID")
    private Long id;

    private boolean complete;
    private String task;

    @Enumerated(EnumType.STRING)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODOLIST_ID")
    private Todolist todolist;

    @Builder
    public Todoitem(Long id, boolean complete, String task, Subject subject, Todolist todolist) {
        this.id = id;
        this.complete = complete;
        this.task = task;
        this.subject = subject;
        this.todolist = todolist;
    }

    public void update(Long todoItemId, TodoitemRequestDto todoitemRequestDto) {
        this.id = todoItemId;
        this.complete = todoitemRequestDto.isComplete();
        this.task = todoitemRequestDto.getTask();
        this.subject = todoitemRequestDto.getSubject();
        this.todolist = todoitemRequestDto.toEntity().getTodolist();
    }
}
