package com.a401.backend.domain.Room.api;

import com.a401.backend.domain.Room.application.RoomMembersService;
import com.a401.backend.domain.Room.application.RoomService;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.domain.RoomMembers;
import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final RoomMembersService roomMembersService;

    @GetMapping("/list")
    @ResponseBody
    public Page<RoomResponseDto> roomList(@PageableDefault(size = 6) Pageable pageable) {
        return roomService.getAllActivateRooms(pageable);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto roomRequestDto, @CurrentUser PrincipalDetails principalDetails){
        Member member = principalDetails.getMember();

        if(!roomMembersService.isInRoom(member)){ // 참여하고 있는 방이 없다면
            // 방 생성
            Room createdRoom = roomService.createRoom(roomRequestDto,member);

            // RoomMembers에 insert
            roomMembersService.enterRoom(createdRoom,member);

            // 방 입장 로그 남기기
            

            return new ResponseEntity<>(createdRoom.getRoomUrl(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//
//    @PostMapping()
//    @ResponseBody
//    public Room createRoom(@RequestParam RoomRequestDto roomRequestDto) {
//        return roomService.createRoom(roomRequestDto);
//    }

}
