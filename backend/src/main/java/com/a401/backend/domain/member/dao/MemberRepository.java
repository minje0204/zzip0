package com.a401.backend.domain.member.dao;

import com.a401.backend.domain.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);
    
    Optional<Member> findByProviderAndProviderId(String provider, String providerId);
    Optional<Member> findByProviderId(String providerId);
}
