package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface MypageMapper {
    public ArrayList<WordVO> favoriteList(String username);

}
