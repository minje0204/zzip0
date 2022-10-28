package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.dao.RoomRepository;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public Page<RoomResponseDto> getAllActivateRooms(Pageable pageable) {
        Page<Room> roomList = roomRepository.findByActivateTrue(pageable);
        Page<RoomResponseDto> roomResponseDtos = roomList.map(e -> new RoomResponseDto(e));
        return roomResponseDtos;
    }

    @Override
    public Room createRoom(RoomRequestDto roomRequestDto, Member member) {
        Room room = Room.builder()
                .owner(member)
                .roomTitle(roomRequestDto.getRoomTitle())
                .roomCategory(roomRequestDto.getRoomCategory())
                .startTime(LocalDateTime.now())
                .activate(true)
                .build();
        Room savedRoom = roomRepository.save(room);
        return savedRoom;
    }
}
