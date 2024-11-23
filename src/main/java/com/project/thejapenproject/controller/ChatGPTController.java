package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.UsernameReqVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.gpt.service.GptService;
import com.project.thejapenproject.gpt.vo.AiRecordListResVO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping(value = "/chat-gpt")
@RequiredArgsConstructor
public class ChatGPTController {

    private final GptService gptService;

    @Value("${openai.secret-key}")
    private String key;

    @NoneCheckToken
    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Map<String, String> map) {
        if (Objects.isNull(map)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        RestTemplate restTemplate = new RestTemplate();

        URI uri = UriComponentsBuilder
                .fromUriString("https://api.openai.com/v1/chat/completions")
                .build()
                .encode()
                .toUri();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);
        ArrayList<Message> list = new ArrayList<>();
        list.add(new Message("user", map.get("message")));
        Body body = new Body("gpt-3.5-turbo", list);
        RequestEntity<Body> httpEntity = new RequestEntity<>(body, httpHeaders, HttpMethod.POST, uri);
        ResponseEntity<String> exchange = restTemplate.exchange(httpEntity, String.class);

        // DB에 내용 저장(ai_record 테이블 순서, 질문, 답변)
        gptService.registerGptData(map.get("username"),
                map.get("aiRecordNum"),
                map.get("message"),
                exchange.getBody());

        return ResponseEntity.ok(exchange.getBody());
    }

    /**
     * Ai 학습 이전 내역 조회 API
     *
     * @Param username : username을 통해 목록 조회
     * @author : chanhan
     * @since : 2024-11-23 오후 01:48
     **/
    @GetMapping("/record")
    @ResponseBody
    public ResponseData record(@Valid @ModelAttribute UsernameReqVO usernameReqVO) {

        // 목록 조회
        ArrayList<AiRecordListResVO> recordList = gptService.getAiRecordList(usernameReqVO.getUsername());

        return ResponseData.builder()
                .message(recordList.isEmpty() ? "이전 기록이 없습니다." : "정상적으로 조회 되었습니다.")
                .data(recordList)
                .code(HttpStatus.OK.value())
                .build();
    }


    @AllArgsConstructor
    @Data
    static class Body {
        String model;
        List<Message> messages;
    }

    @AllArgsConstructor
    @Data
    static class Message {
        String role;
        String content;
    }
}
