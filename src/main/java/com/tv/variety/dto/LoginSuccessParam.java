package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class LoginSuccessParam {
     String id;
     String name;
      String token;
      int is_manage;
      String picurl;
      long tokentime;

}
