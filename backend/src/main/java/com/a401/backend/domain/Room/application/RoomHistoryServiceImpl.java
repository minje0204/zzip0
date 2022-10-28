package com.a401.backend.domain.Room.application;

import com.a401.backend.domain.Room.dao.RoomHistoryRepository;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.domain.RoomHistory;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RoomHistoryServiceImpl implements RoomHistoryService {
    private final RoomHistoryRepository roomHistoryRepository;

    @Override
    public void leaveLog(Room room, Member member, RoomAction roomAction){
        RoomHistory roomHistory = RoomHistory.builder()
                .room(room)
                .member(member)
                .roomAction(roomAction)
                .actionTime(LocalDateTime.now())
                .build();
        roomHistoryRepository.save(roomHistory);
        return true;
    }
}
