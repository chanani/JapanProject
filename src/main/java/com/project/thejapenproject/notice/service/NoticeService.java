package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.notice.vo.GetListReqVO;
import com.project.thejapenproject.notice.vo.GetNoticeDetailResVO;

import java.util.ArrayList;

public interface NoticeService {

    // 공지사항 전체 목록 조회
    public PageResponse<NoticeVO> getList(GetListReqVO getListReqVO);

    // 공지사항 알람 리스트 조회
    public ArrayList<NoticeVO> alarmList(String username);

    // 확인한 공지사항 체크하기
    public int noticeCheck(Integer notice_num, String username);

    // 공지사항 상세 목록 조회
    public ArrayList<GetNoticeDetailResVO> getDetailNotice(Integer noticeNum);
}
