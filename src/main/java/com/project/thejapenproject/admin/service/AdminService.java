package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.admin.vo.AddNoticeReqVO;
import com.project.thejapenproject.admin.vo.AddWordReqVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;

import java.util.ArrayList;

public interface AdminService {

    // 단어 등록
    public int addWordList(AddWordReqVO list);

    // 공지사항 등록
    public int addNotice(AddNoticeReqVO addNoticeReqVO);
    public int addWeekWord(ArrayList<SchoolVO> list);
}
