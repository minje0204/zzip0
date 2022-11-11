package com.a401.backend.domain.room.application;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.UUID;

public interface RoomService {
    Page<RoomResponseDto> getAllActivateRooms(Pageable pageable);

    RoomResponseDto createRoom(RoomRequestDto roomRequestDto, Member member);

    Room findRoom(Long roomId);

    Room findRoomByUrl(UUID roomUrl);

    @Transactional
    boolean deactivate(Room room);

    @Transactional
    boolean updateBg(String url, Background background);
}
