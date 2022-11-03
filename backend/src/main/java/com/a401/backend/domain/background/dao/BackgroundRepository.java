package com.a401.backend.domain.background.dao;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.model.BackgroundCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundRepository extends JpaRepository<Background,Long> {
    Background findBackgroundByBgId(Long bgId);

    @Query(value = "SELECT * FROM background WHERE bg_category = :category ORDER BY RAND() limit 1",nativeQuery = true)
    Background findBackgroundByCategory(@Param("category") String category);
}
