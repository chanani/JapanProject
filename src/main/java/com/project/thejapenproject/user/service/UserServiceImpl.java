package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.GetUserIconReqVO;
import com.project.thejapenproject.command.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    public final UserMapper usermapper;

    @Override
    public UserVO login(String username, String password) {
        return usermapper.login(username, password);
    }

    @Override
    @Transactional
    public int join(UserVO userVO) {
        return usermapper.join(userVO);
    }

    @Override
    public int logDate(String username) {
        return usermapper.logDate(username);
    }

    @Override
    public boolean emailAuth(String email) {
        return usermapper.emailAuth(email);
    }

    @Override
    public String findId(String email) {
        return usermapper.findId(email);
    }

    @Override
    @Transactional
    public int passwordChange(String email, String password) {
        return usermapper.passwordChange(email, password);
    }

    @Override
    public boolean checkId(String username) {
        return usermapper.checkId(username);
    }

    @Override
    public boolean checkEmail(String user_email) {
        return usermapper.checkEmail(user_email);
    }

    @Override
    public boolean checkPhone(String user_phone) {
        return usermapper.checkPhone(user_phone);
    }

    @Override
    public String getUserIcon(GetUserIconReqVO getUserIconReqVO) {
        return usermapper.getUserIcon(getUserIconReqVO);
    }

    // 권한 조회
    @Override
    public String getRole(String username) {
        return usermapper.getRole(username);
    }

}
