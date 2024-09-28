package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.test.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    public final TestService testService;

    @NoneAuth
    @GetMapping("/word/{level}")
    public ResponseEntity<ArrayList<WordVO>> getTestList(@PathVariable Integer level) {
        return ResponseEntity.ok(testService.getTestList(level));
    }

    @NoneCheckToken
    @PostMapping("/record")
    @Transactional
    public ResponseEntity<String> testResult(@RequestBody Map<String, Object> data) {
        if(Objects.isNull(data)){
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        ArrayList<Object> list = (ArrayList<Object>) data.get("answer");
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

        int a = testService.insertRecord((Integer) data.get("level"),
                (String) data.get("username"),
                (Integer) data.get("point"),
                (boolean) data.get("kind"));

        int b = testService.recordData(testList,
                (String) data.get("username"));

        if (a == 1 && b == 10) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.ok("실패");
        }
    }
}
