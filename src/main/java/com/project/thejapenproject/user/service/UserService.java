package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {

    public int join(UserVO userVO);

}
