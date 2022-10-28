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
        Page<RoomResponseDto> roomResponseDtos =roomList.map(e-> new RoomResponseDto(e));
        return roomResponseDtos;
    }

    @Override
    public Room createRoom(RoomRequestDto roomRequestDto, Member member){
        // TODO: 2022-10-27  ownerId깂을 넘겨받을지 아님 principalDetail 객체를 받을지는 고려해봐야함


        // TODO: 2022-10-27 ownerid가 다른 방에 참여중인지 확인하는 로직 필요 -> 다른 방에 참여중일 경우 exception throw


        // 방 생성
        Room room  = Room.builder()
                .owner(member)
                .roomTitle(roomRequestDto.getRoomTitle())
                .roomCategory(roomRequestDto.getRoomCategory())
                .startTime(LocalDateTime.now())
                .activate(true)
                .build();
        Room savedRoom = roomRepository.save(room);
        return savedRoom;
    }
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
