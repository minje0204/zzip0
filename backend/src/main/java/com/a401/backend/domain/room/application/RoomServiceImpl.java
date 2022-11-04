package com.a401.backend.domain.room.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.dao.RoomRepository;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

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

    @Override
    public Room findRoom(Long roomId) {
        Optional<Room> optionalRoom = roomRepository.findByRoomId(roomId);
        return optionalRoom.orElse(null);
    }

    @Override
    public boolean deactivate(Room room) {
        try {
            room.update(room, LocalDateTime.now(), false);
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
