package com.a401.backend.domain.noise.dao;

import com.a401.backend.domain.noise.domain.Noise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoiseRepository extends JpaRepository<Noise,Long> {
}
