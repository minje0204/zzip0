package com.a401.backend.domain.room.dao;

import com.a401.backend.domain.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Page<Room> findByActivateTrue(Pageable pageable);

    Optional<Room> findByRoomId(Long roomId);
//    Optional<Room> findByOwnerId(long ownerId);
}
