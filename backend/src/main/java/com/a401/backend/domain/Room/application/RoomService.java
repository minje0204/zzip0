package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomService {
    Page<RoomResponseDto> getAllActivateRooms(Pageable pageable);


    String createRoom(RoomRequestDto roomRequestDto, Long ownerId);
}
