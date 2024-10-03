package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.test.service.TestService;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    public final TestService testService;

    /**
     * 테스트 내용 가져오는 API
     * level에 단계 필수 전달.
     */
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
}
