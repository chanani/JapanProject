package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.WordVO;

import java.util.ArrayList;

public interface MypageService {

    public ArrayList<WordVO> favoriteList(String username);
}
