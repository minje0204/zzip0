package com.a401.backend.domain.room.application;

import com.a401.backend.domain.background.dao.BackgroundRepository;
import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.dao.RoomRepository;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomResponseDto;
import com.a401.backend.domain.TodoItem.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final BackgroundRepository backgroundRepository;
    private final String[] randomRoomTitle = {
            "%s와 함께 공부를",
            "%s는 공부가 하고 싶어서",
            "%s랑 공부할 사람~",
            "%s의 불타는 공부방",
            "열공할 사람~ %s한테 붙어라~",
            "%s, 공부 뿌시는 중..",
            "%s의 공부방",
    };

    @Override
    public Page<RoomResponseDto> getAllActivateRooms(Pageable pageable) {
        Page<Room> roomList = roomRepository.findByActivateTrue(pageable);
        Page<RoomResponseDto> roomResponseDtos = roomList.map(e -> new RoomResponseDto(e));
        return roomResponseDtos;
    }

    @Override
    public RoomResponseDto createRoom(RoomRequestDto roomRequestDto, Member member) {
        Background background = null;
        if (roomRequestDto.getBackgroundId() != null) {
            background = backgroundRepository.findBackgroundByBgId(roomRequestDto.getBackgroundId());
        } else if (roomRequestDto.getBackgroundCategory() != null) {
            background = backgroundRepository.findBackgroundByCategory(roomRequestDto.getBackgroundCategory().toString());
        } else {
            throw new ResourceNotFoundException("Background", "no BackgroundId or BackgroundCategory", roomRequestDto);
        }
        if (roomRequestDto.getRoomTitle() == null) {
            String title = randomRoomTitle[(int) (Math.random() * 7)];
            roomRequestDto.setRoomTitle(String.format(title, member.getMembername()));
        }
        Room room = Room.builder()
                .owner(member)
                .roomTitle(roomRequestDto.getRoomTitle())
                .background(background)
                .startTime(LocalDateTime.now())
                .activate(true)
                .build();
        Room savedRoom = roomRepository.save(room);
        return RoomResponseDto.builder().room(savedRoom).build();
    }


    @Override
    public Room findRoom(Long roomId) {
        Optional<Room> optionalRoom = roomRepository.findByRoomId(roomId);
        return optionalRoom.orElse(null);
    }

    @Override
    public Room findRoomByUrl(UUID roomUrl) {
        Optional<Room> optionalRoom = roomRepository.findByRoomUrl(roomUrl);
        return optionalRoom.orElse(null);
    }

    @Override
    @Transactional
    public boolean deactivate(Room room) {
        try {
            room.update(room, LocalDateTime.now(), false);
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateBg(String url, Background background) {
        try {
            Room room = findRoomByUrl(UUID.fromString(url));
            Room updateRoom = Room.builder()
                    .owner(room.getOwner())
                    .roomTitle(room.getRoomTitle())
                    .background(background)
                    .startTime(room.getStartTime())
                    .endTime(room.getEndTime())
                    .activate(room.isActivate())
                    .build();
            room.update(updateRoom, null, room.isActivate());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
