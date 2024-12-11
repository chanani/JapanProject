package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.admin.vo.AddNoticeReqVO;
import com.project.thejapenproject.admin.vo.AddWordListVO;
import com.project.thejapenproject.admin.vo.AddWordReqVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AdminMapper {

    // 단어 등록
    public int addWordList(AddWordReqVO list);

    // 공지사항 등록
    public int addNotice(AddNoticeReqVO addNoticeReqVO);

    // 주차 단어 등록
    public int addWeekWord(ArrayList<SchoolVO> list);

    // 단어 예제 등록
    int addWordExample(AddWordListVO addWordListVO);

}
