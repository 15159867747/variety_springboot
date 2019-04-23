package com.tv.variety.controller;

import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.UserAddParms;
import com.tv.variety.param.UserloginParas;
import com.tv.variety.util.JsonResult;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IUserController {

//    String UserInform(String name);

    JsonResult<String> addUser(UserAddParms userAddParms);

    //用户登录检查
    JsonResult<String> logincheck(UserloginParas resqUser);

    //退出登录
    JsonResult<String> Exit(String userid);
}
