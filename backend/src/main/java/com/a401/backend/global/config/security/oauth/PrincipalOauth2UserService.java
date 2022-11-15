package com.a401.backend.global.config.security.oauth;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import com.a401.backend.global.config.security.oauth.provider.GoogleUserInfo;
import com.a401.backend.global.config.security.oauth.provider.OAuth2UserInfo;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration: " + userRequest.getClientRegistration());
        System.out.println("getAccessToken: " + userRequest.getAccessToken().getTokenValue());
        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println("oAuth2User: " + oAuth2User);

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else {
            System.out.println("지원하지 않는 oAuth 플랫폼 요청");
        }

        Optional<Member> memberOptional = memberRepository.findByProviderAndProviderIdAndIsActiveTrue(
            oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        Member member;
        if (memberOptional.isPresent()) {
            member = memberOptional.get();
            member.setEmail(oAuth2UserInfo.getEmail());
            memberRepository.save(member);
        } else {
            member = Member.builder()
                .membername(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .isActive(true)
                .roles("ROLE_USER")
                .provider(oAuth2UserInfo.getProvider())
                .providerId(oAuth2UserInfo.getProviderId())
                .build();

            memberRepository.save(member);
        }

        return new PrincipalDetails(member, oAuth2User.getAttributes());
    }
}
