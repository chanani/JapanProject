package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.admin.vo.AddNoticeReqVO;
import com.project.thejapenproject.admin.vo.AddWordReqVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("adminService")
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminMapper adminMapper;

    @Override
    public int addWordList(AddWordReqVO list) {
        return adminMapper.addWordList(list);
    }

    @Override
    public int addNotice(AddNoticeReqVO addNoticeReqVO) {
        return adminMapper.addNotice(addNoticeReqVO);
    }

    @Override
    public int addWeekWord(ArrayList<SchoolVO> list) {
        return adminMapper.addWeekWord(list);
    }
}
