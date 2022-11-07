package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoomService {
    Page<RoomResponseDto> getAllActivateRooms(Pageable pageable);

    RoomResponseDto createRoom(RoomRequestDto roomRequestDto, Member member);

    Room findRoom(Long roomId);

    boolean deactivate(Room room);
}
