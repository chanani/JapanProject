package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.notice.vo.GetListReqVO;
import com.project.thejapenproject.notice.vo.GetNoticeDetailResVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface NoticeMapper {

    // 공지사항 전체 목록 조회
    public ArrayList<NoticeVO> getList(GetListReqVO getListReqVO);

    // 알람 창에 공지사항 목록 조회
    public ArrayList<NoticeVO> alarmList(String username);

    // 공지사항 확인했을 때 체크
    public int noticeCheck(@Param("notice_num") Integer notice_num, @Param("username") String username);

    // 공지사항 체크했는지 확인
    public boolean checkList(@Param("notice_num") Integer notice_num, @Param("username") String username);

    // 공지사항 상세 조회(이전글, 다음글까지 조회)
    public ArrayList<GetNoticeDetailResVO> getDetailNotice(Integer noticeNum);

}
