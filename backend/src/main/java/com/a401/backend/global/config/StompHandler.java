package com.a401.backend.global.config;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.room.application.RoomMembersService;
import com.a401.backend.domain.room.application.RoomService;
import com.a401.backend.domain.room.domain.Room;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler extends ChannelInterceptorAdapter {

    private final RoomMembersService roomMembersService;
    private final RoomService roomService;
    private final MemberRepository memberRepository;

    @Override
    public void postSend(Message message, MessageChannel channel, boolean sent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//        log.info(accessor.toString());
        String sessionId = accessor.getSessionId();
        switch (accessor.getCommand()) {
            case CONNECT:
                log.info("소켓 세션" + sessionId);
                // TODO: 2022-11-07 멤버 찾기
                String email = accessor.getFirstNativeHeader("userEmail");
//                Member member = memberRepository.

                // TODO: 2022-11-07 방 찾기
                UUID roomUrl = UUID.fromString(accessor.getFirstNativeHeader("roomUrl"));
                Room enterRoom = roomService.findRoomByUrl(roomUrl);

                // TODO: 2022-11-07 방 입장
//                roomMembersService.enterRoom();
                // TODO: 2022-11-07 방 로그 남기기

                break;
            case DISCONNECT:
                // 유저가 Websocket으로 disconnect() 를 한 뒤 호출됨 or 세션이 끊어졌을 때 발생함(페이지 이동~ 브라우저 닫기 등)
                log.info("소켓 세션 끊어짐" + sessionId);
                // TODO: 2022-11-07 방 퇴장
                // TODO: 2022-11-07 방 퇴장 로그 남기기
                // TODO: 2022-11-07 타임로그 끝내버리기

                break;
            default:
                break;
        }

    }
}