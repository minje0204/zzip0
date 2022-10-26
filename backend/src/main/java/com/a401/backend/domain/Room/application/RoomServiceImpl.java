package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.dao.RoomRepository;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public Page<RoomResponseDto> getAllActivateRooms(Pageable pageable) {
        Page<Room> roomList = roomRepository.findByActivateTrue(pageable);
        Page<RoomResponseDto> roomResponseDtos = (Page<RoomResponseDto>) roomList.stream().map(RoomResponseDto::new).collect(Collectors.toList());
        return roomResponseDtos;
    }

    //@AuthenticationalPrincipal을 통해 user 입력 받아야함
//    @Override
//    public Room createRoom(RoomRequestDto roomRequestDto) {
//
//        // 방에 이미 참가중인 사람은 개설 불가능 에러
//
//        long ownerId =1;
//
//        // 방 만들기
//        Room room = Room.builder()
//                .ownerId(ownerId)
//                .roomTitle(roomRequestDto.getRoomTitle())
//                .roomCategory(roomRequestDto.getBgmCategory())
//                .activeRoom(true)
//                .build();
//
//        /***
//         * 방에 입장한 로그 남기기
//         * 구현부
//         */
//        return roomRepository.save(room);
////        Optional<Room> room = roomRepository.findByOwnerId(ownerId);
////        if(!room.isPresent()){
////
////        }else{// 내가 방을 개설한 적이 없다면
////
////        }
//    }
}
