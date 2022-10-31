package com.a401.backend.domain.TodoList.dto.response;

import com.a401.backend.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TodoListResponseDto {

    private LocalDateTime date;
    private Member member;

    @Builder
    public TodoListResponseDto(LocalDateTime date, Member member) {
        this.date = date;
        this.member = member;
    }
}
