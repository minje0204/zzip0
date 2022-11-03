package com.a401.backend.domain.background.dao;

import com.a401.backend.domain.background.domain.BackgroundLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundLikeRepository extends JpaRepository<BackgroundLike,Long> {
}
