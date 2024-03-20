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
}
