package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    public UserVO login(@Param("username")String username, @Param("password") String password);
    public int join(UserVO userVO);
    public int logDate(String username);
}
