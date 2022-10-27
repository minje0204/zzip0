package com.a401.backend.domain.Room.api;

import com.a401.backend.domain.Room.application.RoomService;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/list")
    @ResponseBody
    public Page<RoomResponseDto> roomList(@PageableDefault(size = 6) Pageable pageable) {
        return roomService.getAllActivateRooms(pageable);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto roomRequestDto){
        // TODO: 2022-10-27 사용자 주입 받기
        Long ownerId = 1l;

        // 방 생성
        String roomUrl = roomService.createRoom(roomRequestDto,ownerId);

        // 방 id 만들어서 반환해줘야함

        return new ResponseEntity<>(roomUrl, HttpStatus.OK);

    }
//
//    @PostMapping()
//    @ResponseBody
//    public Room createRoom(@RequestParam RoomRequestDto roomRequestDto) {
//        return roomService.createRoom(roomRequestDto);
//    }

}
