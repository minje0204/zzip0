package com.a401.backend.domain.member.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
