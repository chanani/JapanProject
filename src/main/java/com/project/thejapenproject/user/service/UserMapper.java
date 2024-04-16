package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public UserVO login(UserVO userVO);
    public int join(UserVO userVO);
    public int logDate(String username);
}
