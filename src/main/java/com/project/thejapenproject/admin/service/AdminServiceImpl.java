package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.admin.vo.AddNoticeReqVO;
import com.project.thejapenproject.admin.vo.AddWordListVO;
import com.project.thejapenproject.admin.vo.AddWordReqVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service("adminService")
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminMapper adminMapper;

    @Override
    @Transactional
    public void addWordList(AddWordReqVO list) {
        // 단어 등록
        if (adminMapper.addWordList(list) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_ADD_WORD);
        }

        // 예제 있을 경우 예제 등록
        for (AddWordListVO addWordListVO : list.getList()) {
            System.out.println("addWordListVO = " + addWordListVO);
            if (addWordListVO.getExampleList() != null &&
                    !addWordListVO.getExampleList().isEmpty()) {
                if (adminMapper.addWordExample(addWordListVO) < 1) {
                    throw new OperationErrorException(ErrorCode.FAIL_TO_ADD_WORD);
                }
            }
        }
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
