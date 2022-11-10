package com.a401.backend.domain.room.api;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.room.application.RoomHistoryService;
import com.a401.backend.domain.room.application.RoomMembersService;
import com.a401.backend.domain.room.application.RoomService;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomResponseDto;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final RoomMembersService roomMembersService;
    private final RoomHistoryService roomHistoryService;

    // TODO : 방 ENUM 값 대문자로 치환해주기기
    @GetMapping("/list")
    public Page<RoomResponseDto> roomList(@PageableDefault(size = 6) Pageable pageable) {
        return roomService.getAllActivateRooms(pageable);
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto roomRequestDto, @CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();

        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면
            // 방 생성
            try {
                RoomResponseDto createdRoom = roomService.createRoom(roomRequestDto, member);
                return new ResponseEntity<>(createdRoom, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>("방 만들기에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("현재 다른 방에 참가중입니다.", HttpStatus.BAD_REQUEST);
    }


//    @PostMapping
//    @Deprecated
//    public ResponseEntity<?> createRoomDEPRECATED(@RequestBody RoomRequestDto roomRequestDto, @CurrentUser PrincipalDetails principalDetails) {
//        Member member = principalDetails.getMember();
//
//        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면
//            // 방 생성
//            try {
//                Room createdRoom = roomService.createRoom(roomRequestDto, member);
//
//                // RoomMembers에 insert
//                roomMembersService.enterRoom(createdRoom, member);
//
//                // 방 입장 로그 남기기
//                roomHistoryService.leaveLog(createdRoom, member, RoomAction.CREATE);
//                roomHistoryService.leaveLog(createdRoom, member, RoomAction.ENTER);
//
//                return new ResponseEntity<>(createdRoom.getRoomUrl(), HttpStatus.OK);
//            } catch (Exception e) {
//                return new ResponseEntity<>("방 만들기에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//
//        }
//        return new ResponseEntity<>("현재 다른 방에 참가중입니다.", HttpStatus.BAD_REQUEST);
//    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> canEnterRoom(@PathVariable("roomId") Long roomId, @CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

//    @GetMapping("/{roomId}")
//    public ResponseEntity<?> enterRoom(@PathVariable("roomId") Long roomId, @CurrentUser PrincipalDetails principalDetails) {
//        Member member = principalDetails.getMember();
//
//        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면
//            // 방 찾기
//            Room enteringRoom = roomService.findRoom(roomId);
//            if (enteringRoom != null) {
//                // RoomMembers에 insert
//                roomMembersService.enterRoom(enteringRoom, member);
//
//                // 방 입장 로그 남기기
//                roomHistoryService.leaveLog(enteringRoom, member, RoomAction.ENTER);
//                return new ResponseEntity<>("방에 성공적으로 참가했습니다", HttpStatus.OK);
//            }
//            return new ResponseEntity<>("없는 방입니다.", HttpStatus.BAD_REQUEST);
//
//        }
//        return new ResponseEntity<>("이미 방에 참가중입니다.", HttpStatus.BAD_REQUEST);
//    }

    @GetMapping("/{roomId}/king")
    public ResponseEntity<?> isKing(@PathVariable("roomId") Long roomId, @CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        Room enteringRoom = roomService.findRoom(roomId);
        if (enteringRoom != null) {
            return new ResponseEntity<>(enteringRoom.getOwner().equals(member), HttpStatus.OK);
        }
        return new ResponseEntity<>("없는 방입니다.", HttpStatus.BAD_REQUEST);
    }

//    @PatchMapping("/{roomId}/exit")
//    public ResponseEntity<?> exitRoom(@PathVariable("roomId") Long roomId, @CurrentUser PrincipalDetails principalDetails) {
//        Member member = principalDetails.getMember();
//        Room room = roomService.findRoom(roomId);
//        if (room != null) {
//            // TODO: 2022-11-03 방장이 나가면 방 폭파
//
//            try {
//                // RoomMembers에서 삭제
//                roomMembersService.exitRoom(room, member);
//
//                // 방 퇴장 로그 남기기
//                roomHistoryService.leaveLog(room, member, RoomAction.EXIT);
//
//                // TODO: 2022-11-03 만약 방에 남은 인원이 0명이라면 방 active=false로 바꾸기
//                if (roomMembersService.getMemberCount(room) == 0) {
//                    if (roomService.deactivate(room))
//                        return new ResponseEntity<>("방 퇴장 후 방이 폐쇄되었습니다.", HttpStatus.OK);
//                    else return new ResponseEntity<>("방 퇴장은 성공했으나 폐쇄에 실패했습니다.", HttpStatus.OK);
//                }
//                return new ResponseEntity<>("방 퇴장에 성공했습니다.", HttpStatus.OK);
//            } catch (Exception e) {
//                return new ResponseEntity<>("방 퇴장에 실패했습니다. :" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }
//        return new ResponseEntity<>("없는 방입니다.", HttpStatus.BAD_REQUEST);
//
//    }
}
