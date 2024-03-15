package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.command.WordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public int addWordList(ArrayList<WordVO> list) {
        return adminMapper.addWordList(list);
    }
}
