package com.a401.backend.domain.TodoItem.domain;

import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
import com.a401.backend.domain.TodoList.domain.TodoList;
import com.a401.backend.domain.model.Subject;
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
public class TodoItem {

    @Id
    @GeneratedValue
    @Column(name = "TODOITEM_ID")
    private Long id;

    private String content;
    private boolean complete;

    @Enumerated(EnumType.STRING)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODOLIST_ID")
    private TodoList todolist;

    @Builder
    public TodoItem(Long id, boolean complete, String content, Subject subject, TodoList todolist) {
        this.id = id;
        this.complete = complete;
        this.content = content;
        this.subject = subject;
        this.todolist = todolist;
    }

    public void update(TodoItem todoItem, TodoItemRequestDto todoitemRequestDto) {
//        this.id = todoItem.getId();
        this.complete = todoitemRequestDto.isComplete();
//        this.content = todoitemRequestDto.getContent();
//        this.subject = todoitemRequestDto.getSubject();
//        this.todolist = todoItem.getTodolist();
    }
}
