package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.RecordDetailsVO;
import com.project.thejapenproject.command.RecordVO;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface MypageMapper {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(@Param("username") String username, @Param("record_num") Integer record_num);
    public UserVO myInfo(String username);
    public int modifyInfo(UserVO userVO);
    public int withdrawal(String username);

}
