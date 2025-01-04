package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.test.vo.*;
import com.project.thejapenproject.test.service.TestService;
import com.project.thejapenproject.test.vo.param.ShortTestListReqVO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    public final TestService testService;

    /**
     * 테스트 내용 가져오는 API
     * level에 단계 필수 전달.
     */
    @Operation(summary = "테스트 내용 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/word/{level}")
    public ResponseEntity<ArrayList<GetTestListResVO>> getTestList(@PathVariable Integer level) {
        if (level == null) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM_LEVEL);
        }
        return ResponseEntity.ok(testService.getTestList(level));
    }

    /**
     * 점수 기록 API
     */
    @Operation(summary = "테스트 점수 기록 API",
            description = ""
    )
    @NoneCheckToken
    @PostMapping("/record")
    @Transactional
    public ResponseEntity<String> testResult(@Valid @RequestBody TestRecordRegisterReqVO testRecordRegisterReqVO) {

        ArrayList<Object> list = testRecordRegisterReqVO.getAnswer();
        ArrayList<TestItemVO> testList = new ArrayList<>();
        for (Object x : list) {
            String[] str = String.valueOf(x).replace("[", "").replace("]", "")
                    .replaceAll(",", "_").split("_ ");
            TestItemVO vo = TestItemVO.builder()
                    .dataValue(str[0])
                    .word_num(Integer.parseInt(str[1]))
                    .result_check(str[2])
                    .build();
            testList.add(vo);
        }

        int insertRecordResult = testService.insertRecord(testRecordRegisterReqVO);

        int insertDetailResult = testService.recordData(testList, testRecordRegisterReqVO.getUsername());

        if (insertRecordResult == 1 && insertDetailResult == 10) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.ok("실패");
        }
    }


    /**
     * 선택 단어 테스트 데이터 저장 API
     * @param choiceTestSaveReqVO
     * @return
     */
    @Operation(summary = "선택 단어 테스트 데이터 저장 API",
            description = ""
    )
    @PostMapping("/choice-test-register")
    public ResponseData choiceTestRegister(@Valid @RequestBody ChoiceTestSaveReqVO choiceTestSaveReqVO){
        testService.registerChoiceTest(choiceTestSaveReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("정상적으로 저장 되었습니다.")
                .build();
    }

    /**
     * 단답형 테스트 문제 목록 API
     * @param shortTestListReqVO
     * @return
     */
    @Operation(summary = "단답형 테스트 문제 목록 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/short-test-list")
    public ResponseData shortTestList(@Valid @ModelAttribute ShortTestListReqVO shortTestListReqVO){
        ArrayList<ShortTestListResVO> wordList = testService.getShortTestList(shortTestListReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(wordList)
                .message("정상적으로 조회 되었습니다.")
                .build();
    }

    /**
     * 단답형 단어 테스트 데이터 저장 API
     * @param shortTestSaveReqVO
     * @return
     */
    @Operation(summary = "단답형 단어 테스트 데이터 저장 API",
            description = ""
    )
    @PostMapping("/short-test-register")
    public ResponseData shortTestRegister(@Valid @RequestBody ShortTestSaveReqVO shortTestSaveReqVO){
        testService.registerShortTest(shortTestSaveReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("정상적으로 저장 되었습니다.")
                .build();
    }
}
