package com.a401.backend.global.config.security.auth;

import com.a401.backend.domain.member.domain.Member;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class PrincipalDetails implements UserDetails, OAuth2User {

    private Member member;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;


    public PrincipalDetails(Member member,
        Collection<? extends GrantedAuthority> authorities) {
        this.member = member;
        this.authorities = authorities;
    }

    public PrincipalDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    public static PrincipalDetails create(Member member) {
        List<GrantedAuthority> authorities = Collections.
            singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return new PrincipalDetails(
            member,
            authorities
        );
    }

    public static PrincipalDetails create(Member member, Map<String, Object> attributes) {
        PrincipalDetails principalDetails = PrincipalDetails.create(member);
        principalDetails.setAttributes(attributes);
        return principalDetails;
    }

    public Member getMember() {
        return member;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return member.getId() + "";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return member.getMembername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
