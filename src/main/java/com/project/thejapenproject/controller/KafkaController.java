package com.project.thejapenproject.controller;


import com.project.thejapenproject.kafka.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/kafka")
public class KafkaController {
    @Autowired
    ProducerService producerService;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Map<String, String> map){
        String message = map.get("message");
        producerService.commentNotificationCreate(message);
        return ResponseEntity.ok("성공");
    }


}
