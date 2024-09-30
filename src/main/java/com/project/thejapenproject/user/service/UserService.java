package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.GetUserIconReqVO;
import com.project.thejapenproject.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {

    public UserVO login(String username, String password);
    public int join(UserVO userVO);
    public int logDate(String username);
    public boolean emailAuth(String email);
    public String findId(String email);
    public int passwordChange(String email, String password);
    public boolean checkId(String username);
    public boolean checkEmail(String user_email);
    public boolean checkPhone(String user_phone);

    // user image 조회
    public String getUserIcon(GetUserIconReqVO getUserIconReqVO);
}
