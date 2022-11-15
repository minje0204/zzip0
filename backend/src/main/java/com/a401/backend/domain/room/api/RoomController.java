package com.a401.backend.domain.room.api;

import com.a401.backend.domain.background.application.BackgroundService;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberResponseDto;
import com.a401.backend.domain.room.application.RoomHistoryService;
import com.a401.backend.domain.room.application.RoomMembersService;
import com.a401.backend.domain.room.application.RoomService;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.dto.request.RoomRequestDto;
import com.a401.backend.domain.room.dto.response.RoomAndMemberResponseDto;
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

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final RoomMembersService roomMembersService;
    private final RoomHistoryService roomHistoryService;
    private final BackgroundService backgroundService;

    // TODO : 방 ENUM 값 대문자로 치환해주기기
    @GetMapping("/list")
    public Page<RoomResponseDto> roomList(@PageableDefault(size = 6) Pageable pageable) {
        return roomService.getAllActivateRooms(pageable);
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto roomRequestDto, @CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();

        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면\
            // 방 생성
            try {
                RoomResponseDto createdRoom = roomService.createRoom(roomRequestDto, member);
                return new ResponseEntity<>(createdRoom, HttpStatus.OK);
            } catch (Exception e) {
                log.info(e.getMessage());
                return new ResponseEntity<>("방 만들기에 실패했습니다. :" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("현재 다른 방에 참가중입니다.", HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/enter")
    public ResponseEntity<?> canEnterRoom(@CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        if (!roomMembersService.isInRoom(member)) { // 참여하고 있는 방이 없다면
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @GetMapping("/{roomUrl}")
    public ResponseEntity<?> getRoomData(@PathVariable("roomUrl") String roomUrl) {
        Room room = roomService.findRoomByUrl(UUID.fromString(roomUrl));
        if (room != null) {
            List<MemberResponseDto> memberList = roomMembersService.getMembers(room);
            return new ResponseEntity<>(RoomAndMemberResponseDto.builder().room(room).memberList(memberList).build(), HttpStatus.OK);
        }
        return new ResponseEntity<>("없는 방입니다.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{roomId}/king")
    public ResponseEntity<?> isKing(@PathVariable("roomId") Long roomId, @CurrentUser PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        Room enteringRoom = roomService.findRoom(roomId);
        if (enteringRoom != null) {
            return new ResponseEntity<>(enteringRoom.getOwner().equals(member), HttpStatus.OK);
        }
        return new ResponseEntity<>("없는 방입니다.", HttpStatus.BAD_REQUEST);
    }

}
