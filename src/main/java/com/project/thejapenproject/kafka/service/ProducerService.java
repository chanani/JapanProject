package com.project.thejapenproject.kafka.service;

import com.project.thejapenproject.command.NotificationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@EnableKafka
public class ProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    // Producer -> kafka 메시지 전
    public void commentNotificationCreate(String message){
        //NotificationMessage notificationMessage = new NotificationMessage(message);
        log.info("답글 알림 전송, message : {}", message);
        kafkaTemplate.send("dev-topic", message);
    }


}
