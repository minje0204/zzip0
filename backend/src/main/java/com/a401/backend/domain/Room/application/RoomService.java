package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import com.a401.backend.domain.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoomService {
    Page<RoomResponseDto> getAllActivateRooms(Pageable pageable);

    Room createRoom(RoomRequestDto roomRequestDto, Member member);

    Room findRoom(Long roomId);
}
