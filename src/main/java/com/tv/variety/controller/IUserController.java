package com.tv.variety.controller;

import com.tv.variety.dto.UserInformParam;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.UserAddParms;
import com.tv.variety.param.UserSecretParams;
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

    JsonResult<String> addUser(UserloginParas userAddParms);

    //用户登录检查
    JsonResult<String> logincheck(UserloginParas resqUser);

    //退出登录
    JsonResult<String> Exit(String userid);

    //返回用户个人信息
    JsonResult userInform(String userid);

    //修改用户个人信息
   JsonResult  updateUserinform(UserInformParam userInformParam);

    //修改用户个人信息
    JsonResult  updateSecret(UserSecretParams userSecretParams);

    //判断用户密码是否正确
    JsonResult<String> logincheck2(UserloginParas resqUser);

}
