package com.a401.backend.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private StompHandler stompHandler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("https://zzip0.com", "http://localhost:3000")
                .withSockJS()
                .setHeartbeatTime(1000);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
//    @EventListener
//    public void onDisconnectEvent(SessionDisconnectEvent event) {
//        log.info(event.toString());
//    }
//
//    @EventListener
//    public void onConnectEvent(SessionConnectEvent event) {
//        log.info(event.toString());
//    }
//
//    @EventListener
//    public void onConnectedEvent(SessionConnectedEvent event) {
//        log.info(event.toString());
//    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // 서버에서 클라이언트로 보낼 소켓 주소
        registry.enableSimpleBroker("/queue", "/topic");

        // 클라이언트에서 서버로 보내는 소켓 주소
        registry.setApplicationDestinationPrefixes("/app");
    }

}
