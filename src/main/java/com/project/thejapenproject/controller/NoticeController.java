package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.notice.service.NoticeService;
import com.project.thejapenproject.command.GetListReqVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @NoneAuth
    @GetMapping("/getList")
    public ResponseData getList(@Valid @ModelAttribute GetListReqVO getListReqVO) {
        System.out.println("getListReqVO = " + getListReqVO);
        if (getListReqVO.getPage() < 1 || getListReqVO.getSize() < 1) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        PageResponse<NoticeVO> noticeList = noticeService.getList(getListReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(noticeList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    @NoneCheckToken
    @GetMapping("/alarmList/{username}")
    public ResponseEntity<ArrayList<NoticeVO>> alarmList(@PathVariable("username") String username) {
        return ResponseEntity.ok(noticeService.alarmList(username));
    }

    @NoneAuth
    @GetMapping("/noticeCheck/{notice_num}/{username}")
    public ResponseEntity<String> noticeCheck(@PathVariable("notice_num") Integer notice_num,
                                              @PathVariable("username") String username) {
        if (!username.equals("undefined")) {
            noticeService.noticeCheck(notice_num, username);
        }
        return ResponseEntity.ok("성공");
    }
}
