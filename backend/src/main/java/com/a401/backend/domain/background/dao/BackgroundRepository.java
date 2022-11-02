package com.a401.backend.domain.background.dao;

import com.a401.backend.domain.background.domain.Background;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundRepository extends JpaRepository<Background,Long> {
    Background findBackgroundByBgId(Long bgId);
}
