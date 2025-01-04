package com.project.thejapenproject.controller;


import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.kafka.service.NotificationsService;
import com.project.thejapenproject.kafka.service.ProducerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {
    private final ProducerService producerService;
    private final NotificationsService notificationsService;

    @Operation(summary = "Kafka Topic에 등록하는 API",
            description = ""
    )
    @NoneAuth
    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Map<String, String> map){
        String message = map.get("message");
        producerService.commentNotificationCreate(message);
        return ResponseEntity.ok("성공");
    }


    @NoneAuth
    @GetMapping("/notifications")
    public ResponseEntity<String> notificationsList(){
        return ResponseEntity.ok("ㅎㅎ");
    }

}
