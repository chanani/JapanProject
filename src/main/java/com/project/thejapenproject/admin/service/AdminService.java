package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.WordVO;

import java.util.ArrayList;

public interface AdminService {

    public int addWordList(ArrayList<WordVO> list);
    public int addNotice(NoticeVO VO);

}
