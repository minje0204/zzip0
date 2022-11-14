package com.a401.backend.global.config;

import com.a401.backend.domain.member.application.MemberService;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;
import com.a401.backend.domain.room.application.RoomHistoryService;
import com.a401.backend.domain.room.application.RoomMembersService;
import com.a401.backend.domain.room.application.RoomService;
import com.a401.backend.domain.room.domain.Room;
import com.a401.backend.domain.room.domain.RoomMembers;
import com.a401.backend.domain.timelog.application.TimelogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler extends ChannelInterceptorAdapter {

    private final RoomMembersService roomMembersService;
    private final RoomService roomService;
    private final MemberService memberService;
    private final RoomHistoryService roomHistoryService;

    private final TimelogService timelogService;

    @Override
    public void postSend(Message message, MessageChannel channel, boolean sent) {

    }

    @EventListener
    private void handleSessionConnected(SessionConnectEvent event) {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        log.info("ENTER했지롱");
        log.info(headers.toString());
        String sessionId = headers.getSessionId();
        // TODO: 2022-11-07 멤버 찾기
        String email = headers.getFirstNativeHeader("userEmail");
        Member member = memberService.findMember(email);

        // TODO: 2022-11-07 방 찾기
        UUID roomUrl = UUID.fromString(headers.getFirstNativeHeader("roomUrl"));
        Room enterRoom = roomService.findRoomByUrl(roomUrl);

        // TODO: 2022-11-07 방 입장
        roomMembersService.enterRoom(enterRoom, member, sessionId);

        // TODO: 2022-11-07 방 로그 남기기
        roomHistoryService.leaveLog(enterRoom, member, RoomAction.ENTER);
    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String sessionId = headers.getSessionId();

        RoomMembers roomMembers = roomMembersService.findRoomMembersbySessionId(sessionId);
        if (roomMembers == null)
            return;
        Member member = roomMembers.getMember();
        Room room = roomMembers.getRoom();

        // 방 나가기
        roomMembersService.exitRoom(room, member);

        //방 퇴장 로그 남기기
        roomHistoryService.leaveLog(room, member, RoomAction.EXIT);

        // 방 인원이 없다면 방 deactivate
        if (roomMembersService.getMemberCount(room) == 0) {
            roomService.deactivate(room);
        }

        //타임로그들 끝내기
        timelogService.finishTimelogs(member);

        log.info("DISCONNECT했지롱");

    }

}