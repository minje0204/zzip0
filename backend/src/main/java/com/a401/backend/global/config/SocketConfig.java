package com.a401.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // 서버에서 클라이언트로 보낼 소켓 주소
        registry.enableSimpleBroker("/queue", "/topic");

        // 클라이언트에서 서버로 보내는 소켓 주소
        registry.setApplicationDestinationPrefixes("/app");
    }

}
