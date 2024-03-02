package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    public UserMapper usermapper;
    @Override
    public int join(UserVO userVO) {
        return usermapper.join(userVO);
    }
}
