package com.project.thejapenproject.mypage.vo.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ImageChangeParamVO {

    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @NotNull(message = "이미지 파일은 필수입니다.")
    private MultipartFile file;
}
