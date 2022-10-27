package com.a401.backend.domain.Room.dao;

import com.a401.backend.domain.Room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {
    Page<Room> findByActivateTrue(Pageable pageable);
//    Optional<Room> findByOwnerId(long ownerId);
}
