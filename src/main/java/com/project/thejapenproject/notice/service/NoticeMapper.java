package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface NoticeMapper {
    public ArrayList<NoticeVO> getList();

}
