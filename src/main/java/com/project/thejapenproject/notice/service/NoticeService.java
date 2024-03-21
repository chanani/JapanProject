package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;

import java.util.ArrayList;

public interface NoticeService {

    public ArrayList<NoticeVO> getList();
    public ArrayList<NoticeVO> alarmList(String username);
    public int noticeCheck(Integer notice_num, String username);
}
