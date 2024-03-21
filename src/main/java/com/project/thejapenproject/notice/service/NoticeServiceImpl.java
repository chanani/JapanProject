package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public ArrayList<NoticeVO> getList() {
        return noticeMapper.getList();
    }

    @Override
    public ArrayList<NoticeVO> alarmList(String username) {
        return noticeMapper.alarmList(username);
    }

    @Override
    public int noticeCheck(Integer notice_num, String username) {
        boolean result = noticeMapper.checkList(notice_num, username);

        if (result == false) return noticeMapper.noticeCheck(notice_num, username);
        else return 0;
    }
}
