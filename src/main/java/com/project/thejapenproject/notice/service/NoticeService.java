package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.command.GetListReqVO;

import java.util.ArrayList;

public interface NoticeService {

    public PageResponse<NoticeVO> getList(GetListReqVO getListReqVO);
    public ArrayList<NoticeVO> alarmList(String username);
    public int noticeCheck(Integer notice_num, String username);
}
