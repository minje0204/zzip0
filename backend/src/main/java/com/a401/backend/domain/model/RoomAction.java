package com.a401.backend.domain.model;

public enum RoomAction {

    // 방 개설, 입장, 퇴장, 강퇴
    OPEN,
    ENTER,
    EXIT,
    KICKOUT,

    // OpenVidu 관련
    SESSION_CREATE,
    SESSION_EXIT,
    SESSION_ENTER,
    CAMERA_ON,
    CAMERA_OFF,
}
