package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {

    public UserVO login(String username, String password);
    public int join(UserVO userVO);
    public int logDate(String username);

}
