package com.project.thejapenproject.user.service;

import com.project.thejapenproject.command.UserVO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

// 이객체는 화면에 전달이 되는데, 화면에서 여러분이 사용할 값들은 반드시 getter로 생성
public class MyUserDetails implements UserDetails {

    private UserVO userVO;

    public MyUserDetails (UserVO vo){
        this.userVO = vo;
    }

    // 화면에서 권한도 사용할 수 있게 해주 싶으면 getter 생성
    public String getRole(){
        return userVO.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        // UserVO가 가지고 있는 권한을 리트스에 담아서 반환시키면, 스프링 시큐리티가 참조해서 사용합니다.
        List<GrantedAuthority> list = new ArrayList<>();

        list.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userVO.getRole();
            }
        });

        return list;
    }

    @Override
    public String getPassword() {
        return userVO.getPassword();
    }

    @Override
    public String getUsername() {
        return userVO.getUsername();
    }

    // 계정의 만료 여부
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정의 락이걸린 여부
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 만료 여부
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 사용할 수 있는 계정 여부
    @Override
    public boolean isEnabled() {
        return true;
    }
}
