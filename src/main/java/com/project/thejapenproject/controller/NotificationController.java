package com.project.thejapenproject.controller;

import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.kafka.service.NotificationsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@EnableKafka
//@CrossOrigin("*")
public class NotificationController {

    private final NotificationsService notificationService;

    @Operation(summary = "클라이언트 구독 API",
            description = "로그인 시 connect 하여 로그인한 유저 정보를 관리합니다."
    )
    @NoneAuth
    @GetMapping(value = "/subscribe/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribe(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.subscribe(id));
    }

    @Operation(summary = "서버의 이벤트를 클라이언트에게 전달하는 API",
            description = ""
    )
    @NoneAuth
    @PostMapping("/send-data/{id}")
    public void sendData(@PathVariable Long id) {
        System.out.println("send-data : " + id);
        notificationService.notify(id, "data");
    }

    /**
     * kafka topic에 데이터가 추가될 때 데이터 로드
     * @param message
     */
    @NoneAuth
    @KafkaListener(topics = "dev-topic", groupId = "my-test")
    public void listenGroupFoo(@Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Payload String message){
        System.out.println(topic + " " + message);
        notificationService.notifyToAll(message);
    }
}
