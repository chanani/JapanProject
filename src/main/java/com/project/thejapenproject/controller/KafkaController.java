package com.project.thejapenproject.controller;


import com.project.thejapenproject.kafka.service.NotificationsService;
import com.project.thejapenproject.kafka.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/kafka")
public class KafkaController {
    @Autowired
    ProducerService producerService;
    @Autowired
    NotificationsService notificationsService;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Map<String, String> map){
        String message = map.get("message");
        producerService.commentNotificationCreate(message);
        return ResponseEntity.ok("성공");
    }

    @GetMapping("/notifications")
    public ResponseEntity<String> notificationsList(){
        return ResponseEntity.ok("ㅎㅎ");
    }

}
