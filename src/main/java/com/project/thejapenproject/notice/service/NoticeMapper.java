package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.GetListReqVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface NoticeMapper {
    public ArrayList<NoticeVO> getList(GetListReqVO getListReqVO);
    public ArrayList<NoticeVO> alarmList(String username);
    public int noticeCheck(@Param("notice_num") Integer notice_num, @Param("username") String username);
    public boolean checkList(@Param("notice_num") Integer notice_num, @Param("username") String username);
}
