package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.ChoiceRecordDetailParamVO;
import com.project.thejapenproject.mypage.vo.param.GetRecordListParamVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("mypageService")
public class MypageServiceImpl implements MypageService{
    @Autowired
    public MypageMapper mypageMapper;

    // 즐겨찾기 목록
    @Override
    public ArrayList<WordVO> favoriteList(String username) {
        return mypageMapper.favoriteList(username);
    }

    // 학습 기록 목록
    @Override
    public PageResponse<RecordVO> recordList(GetRecordListParamVO getRecordListParamVO) {
        Integer page = getRecordListParamVO.getPage();
        Integer size = getRecordListParamVO.getSize();
        getRecordListParamVO.setOffset((page - 1) * size);

        ArrayList<RecordVO> recordList = mypageMapper.recordList(getRecordListParamVO);
        // 총 데이터 수 계산
        int totalElements = recordList.size() != 0 ? recordList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<RecordVO> responseData = PageResponse.<RecordVO>builder()
                .content(recordList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    @Override
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO) {
        return mypageMapper.recordDetails(getRecordDetailsReqVO);
    }

    @Override
    public UserMypageResVO myInfo(String username) {
        return mypageMapper.myInfo(username);
    }

    @Override
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO) {
        return mypageMapper.modifyInfo(userInfoModifyReqVO);
    }

    // 회원 탈퇴
    @Override
    public void withdrawal(String username) {
        if(mypageMapper.withdrawal(username) < 1){
            throw new OperationErrorException(ErrorCode.FAILED_TO_WITHDRAWAL);
        }
    }

    // 학습 기록 삭제
    @Override
    public void deleteRecord(int recordNum) {
        if(mypageMapper.deleteRecord(recordNum) < 1){
            throw new RequestParameterException(ErrorCode.FAIL_TO_REMOVE_RECORD);
        }
    }

    @Override
    public ArrayList<WordVO> getSchoolList(int wordWeek) {
        return mypageMapper.getSchoolList(wordWeek);
    }

    @Override
    public ArrayList getWeekList() {
        return mypageMapper.getWeekList();
    }

    // 프로필 이미지 수정
    @Override
    public void userImageChange(String fileName, String username) {
        // 기존 이미지 삭제
        mypageMapper.userImageRemove(username);
        // 새로운 이미지 등록
        if(mypageMapper.userImageChange(fileName, username) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_IMAGE);
        }
    }

    // 단어 선택 테스트 내역 조회
    @Override
    public PageResponse<ChoiceRecordListResVO> choiceRecordList(GetRecordListParamVO getRecordListParamVO) {
        Integer page = getRecordListParamVO.getPage();
        Integer size = getRecordListParamVO.getSize();
        getRecordListParamVO.setOffset((page - 1) * size);

        ArrayList<ChoiceRecordListResVO> choiceRecordList = mypageMapper.choiceRecordList(getRecordListParamVO);
        // 총 데이터 수 계산
        int totalElements = choiceRecordList.size() != 0 ? choiceRecordList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<ChoiceRecordListResVO> responseData = PageResponse.<ChoiceRecordListResVO>builder()
                .content(choiceRecordList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 단어 선택 테스트 상새 내역 조회
    @Override
    public ArrayList<ChoiceRecordListDetailResVO> choiceRecordDetailList(ChoiceRecordDetailParamVO choiceRecordDetailParamVO) {
        return mypageMapper.choiceRecordDetailList(choiceRecordDetailParamVO);
    }

    // 단어 선택 테스트 삭제
    @Override
    public void deleteChoiceRecord(ChoiceRecordDeleteReqVO choiceRecordDeleteReqVO) {
        if(mypageMapper.deleteChoiceRecord(choiceRecordDeleteReqVO) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_REMOVE_RECORD);
        }
    }

    //검색페이지에서 즐겨찾기 추가
    @Override
    public int registerFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO) {
        return mypageMapper.registerFavoriteWord(userFavoriteRegisterReqVO);
    }

    // 즐겨찾기 등록 여부 조회
    @Override
    public int checkFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO) {
        return mypageMapper.checkFavoriteWord(userFavoriteRegisterReqVO);
    }


}
