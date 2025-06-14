package com.project.thejapenproject.kafka.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
@Slf4j
public class EmitterRepository {

    // 모든 Emitters를 저장하는 ConcurrentHashMap
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    /**
     * 주어진 아이디와 이미터를 저장
     *
     * @param id      - 사용자 아이디.
     * @param emitter - 이벤트 Emitter.
     */
    public void save(Long id, SseEmitter emitter) {
        emitters.put(id, emitter);
    }

    /**
     * 주어진 아이디의 Emitter를 제거
     *
     * @param id - 사용자 아이디.
     */
    public void deleteById(Long id) {
        System.out.println("Emitter 제거 : " + id);
        emitters.remove(id);
    }

    /**
     * 주어진 아이디의 Emitter를 가져옴.
     *
     * @param id - 사용자 아이디.
     * @return SseEmitter - 이벤트 Emitter.
     */
    public SseEmitter get(Long id) {
        return emitters.get(id);
    }

    /**
     * 모든 Emitter의 정보를 가져옴.
     *
     * @return emitter List
     */
    public Map<Long, SseEmitter> getEmitters() {
        return emitters;
    }

    /**
     * 모든 클라이언트에게 Ping 메시지 전송
     */
    private void sendBroadcastPing() {
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event().name("ping").data("keep-alive"));
            } catch (IOException | IllegalStateException e) {
                log.warn("Ping 메시지 전송 실패 - 사용자: {}, 이유: {}", userId, e.getMessage());
                emitters.remove(userId);
            }
        });
    }

    /**
     * 1분마다 자동으로 Ping 메시지 전송
     */
    @Scheduled(fixedRate = 60 * 1000L)  // 1분마다 ping 전송
    public void scheduledPing() {
        log.info("Emitter check ping : {}", LocalDateTime.now());
        sendBroadcastPing();
    }
}
