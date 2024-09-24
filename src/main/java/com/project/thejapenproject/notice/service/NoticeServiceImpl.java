package com.project.thejapenproject.notice.service;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.notice.vo.GetListReqVO;
import com.project.thejapenproject.notice.vo.GetNoticeDetailResVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    // 공지사항 전체 목록 조회
    @Override
    public PageResponse<NoticeVO> getList(GetListReqVO getListReqVO) {
        Integer page = getListReqVO.getPage();
        Integer size = getListReqVO.getSize();
        getListReqVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<NoticeVO> noticeList = noticeMapper.getList(getListReqVO);

        // 총 데이터 수 계산
        int totalElements = noticeList.size() != 0 ? noticeList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<NoticeVO> responseData = PageResponse.<NoticeVO>builder()
                .content(noticeList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 공지사항 알람 리스트 조회
    @Override
    public ArrayList<NoticeVO> alarmList(String username) {
        return noticeMapper.alarmList(username);
    }

    // 확인한 공지사항 체크하기
    @Override
    public int noticeCheck(Integer notice_num, String username) {
        if (noticeMapper.checkList(notice_num, username) == false) {
            return noticeMapper.noticeCheck(notice_num, username);
        }
        return 0;
    }

    // 공지사항 상세 목록 조회
    @Override
    public ArrayList<GetNoticeDetailResVO> getDetailNotice(Integer noticeNum) {
        return noticeMapper.getDetailNotice(noticeNum);
    }
}
