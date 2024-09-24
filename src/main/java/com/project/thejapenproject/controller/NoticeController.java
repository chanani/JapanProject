package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.notice.service.NoticeService;
import com.project.thejapenproject.notice.vo.GetListReqVO;
import com.project.thejapenproject.notice.vo.GetNoticeDetailResVO;
import com.project.thejapenproject.notice.vo.param.GetNoticeDetailReqVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // 공지사항 전체 목록 조회
    @NoneAuth
    @GetMapping("/getList")
    public ResponseData getList(@Valid @ModelAttribute GetListReqVO getListReqVO) {
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

    // 목록 조회
    @GetMapping("/alarmList/{username}")
    public ResponseEntity<ArrayList<NoticeVO>> alarmList(@PathVariable("username") String username) {
        return ResponseEntity.ok(noticeService.alarmList(username));
    }

    // 공지사항 알람 리스트 조회
    @NoneAuth
    @GetMapping("/noticeCheck/{notice_num}/{username}")
    public ResponseEntity<String> noticeCheck(@PathVariable("notice_num") Integer notice_num,
                                              @PathVariable("username") String username) {
        if (!username.equals("undefined")) {
            noticeService.noticeCheck(notice_num, username);
        }
        return ResponseEntity.ok("성공");
    }

    // 공지사항 상세 목록 조회
    @NoneAuth
    @GetMapping("/get-detail")
    public ResponseData getNoticeDetail(@Valid @ModelAttribute GetNoticeDetailReqVO getNoticeDetailReqVO){
        ArrayList<GetNoticeDetailResVO> noticeDetail = noticeService.getDetailNotice(getNoticeDetailReqVO.getNoticeNum());
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .data(noticeDetail)
                .build();
    }
}
