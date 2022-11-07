package com.a401.backend.domain.timelog.dao;

import com.a401.backend.domain.timelog.domain.Timelog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelogRepository extends JpaRepository<Timelog,Long> {

}
