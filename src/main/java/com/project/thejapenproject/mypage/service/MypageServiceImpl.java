package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service("mypageService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MypageServiceImpl implements MypageService {

    public final MypageMapper mypageMapper;

    // 즐겨찾기 목록
    @Override
    public PageResponse<FavoriteListResVO> favoriteList(FavoriteListVO favoriteListVO) {
        Integer page = favoriteListVO.getPage();
        Integer size = favoriteListVO.getSize();
        favoriteListVO.setOffset((page - 1) * size);

        // 데이터 조회
        ArrayList<FavoriteListResVO> favoriteList = mypageMapper.favoriteList(favoriteListVO);

        // 예문 조회
        ArrayList<ExampleInfoVO> exampleList = mypageMapper.getExampleListFavorite(favoriteList);

        // 단어에 맞는 예문 추가하기
        favoriteList.forEach(word -> {
            ArrayList<ExampleInfoVO> examples = (ArrayList<ExampleInfoVO>) exampleList.stream()
                    .filter(example -> example.getWordNum().equals(word.getWordNum()))
                    .sorted(Comparator.comparingInt(ExampleInfoVO::getWeNum))
                    .collect(Collectors.toList());
            word.setExampleList(new ArrayList<>(examples));
        });


        // 총 데이터 수 계산
        int totalElements = favoriteList.size() != 0 ? favoriteList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<FavoriteListResVO> responseData = PageResponse.<FavoriteListResVO>builder()
                .content(favoriteList)
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
    @Transactional
    public void withdrawal(String username) {
        if (mypageMapper.withdrawal(username) < 1) {
            throw new OperationErrorException(ErrorCode.FAILED_TO_WITHDRAWAL);
        }
    }

    // 학습 기록 삭제
    @Override
    @Transactional
    public void deleteShortRecord(int strNum) {
        if (mypageMapper.deleteShortRecord(strNum) < 1) {
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
    @Transactional
    public void userImageChange(String fileName, String username) {
        // 기존 이미지 삭제
        mypageMapper.userImageRemove(username);
        // 새로운 이미지 등록
        if (mypageMapper.userImageChange(fileName, username) < 1) {
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
    @Transactional
    public void deleteChoiceRecord(ChoiceRecordDeleteReqVO choiceRecordDeleteReqVO) {
        if (mypageMapper.deleteChoiceRecord(choiceRecordDeleteReqVO) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_REMOVE_RECORD);
        }
    }

    //검색페이지에서 즐겨찾기 추가
    @Override
    @Transactional
    public int registerFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO) {
        return mypageMapper.registerFavoriteWord(userFavoriteRegisterReqVO);
    }

    // 즐겨찾기 등록 여부 조회
    @Override
    public int checkFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO) {
        return mypageMapper.checkFavoriteWord(userFavoriteRegisterReqVO);
    }

    // 단답형 단어 테스트 목록 조회
    @Override
    public PageResponse<ShortRecordListResVO> shortTestList(GetRecordListParamVO getRecordListParamVO) {
        Integer page = getRecordListParamVO.getPage();
        Integer size = getRecordListParamVO.getSize();
        getRecordListParamVO.setOffset((page - 1) * size);

        ArrayList<ShortRecordListResVO> recordList = mypageMapper.shortTestList(getRecordListParamVO);
        // 총 데이터 수 계산
        int totalElements = recordList.size() != 0 ? recordList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<ShortRecordListResVO> responseData = PageResponse.<ShortRecordListResVO>builder()
                .content(recordList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 단답형 단어 테스트 결과 상세 조회
    @Override
    public ArrayList<ShortRecordListDetailResVO> shortRecordDetailList(ShortRecordDetailParamVO shortRecordDetailParamVO) {
        return mypageMapper.shortRecordDetailList(shortRecordDetailParamVO);
    }

    // 즐겨찾기 메모 등록
    @Override
    @Transactional
    public void updateFavoriteMemo(updateFavoriteMemoReqVO updateFavoriteMemoReqVO) {
        if (mypageMapper.updateFavoriteMemo(updateFavoriteMemoReqVO) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_UPDATE_FAVORITE_MEMO);
        }
    }

    // 단어 목록(검색 포함)
    @Override
    public PageResponse<WordSearchListResVO> getWordSearchList(WordListSearchParamVO wordListSearchParamVO) {
        Integer page = wordListSearchParamVO.getPage();
        Integer size = wordListSearchParamVO.getSize();
        wordListSearchParamVO.setOffset((page - 1) * size);

        // 단어 조회
        ArrayList<WordSearchListResVO> wordList = mypageMapper.getWordSearchList(wordListSearchParamVO);

        if (!wordList.isEmpty()) {
            // 예문 조회
            ArrayList<ExampleInfoVO> exampleList = mypageMapper.getExampleList(wordList);

            // 단어에 맞는 예문 추가하기
            wordList.forEach(word -> {
                ArrayList<ExampleInfoVO> examples = (ArrayList<ExampleInfoVO>) exampleList.stream()
                        .filter(example -> example.getWordNum().equals(word.getWordNum()))
                        .sorted(Comparator.comparingInt(ExampleInfoVO::getWeNum))
                        .collect(Collectors.toList());
                word.setExampleList(new ArrayList<>(examples));
            });

        }
        // 총 데이터 수 계산
        int totalElements = wordList.size() != 0 ? wordList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<WordSearchListResVO> responseData = PageResponse.<WordSearchListResVO>builder()
                .content(wordList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }


}
