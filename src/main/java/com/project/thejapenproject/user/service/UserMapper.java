package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public UserVO login(String username);
    public int join(UserVO userVO);
    public int logDate(String username);
}
