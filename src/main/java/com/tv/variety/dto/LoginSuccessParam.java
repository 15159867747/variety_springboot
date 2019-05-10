package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class LoginSuccessParam {
    private String id;
    private String name;
    private  String token;
    private  int is_manage;
}
