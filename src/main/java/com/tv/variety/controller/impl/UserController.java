package com.tv.variety.controller.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.controller.IUserController;
import com.tv.variety.dto.LoginSuccessParam;
import com.tv.variety.dto.UserInformParam;
import com.tv.variety.facade.IUserFacade;
import com.tv.variety.facade.impl.UserFacade;
import com.tv.variety.mybatic.mapper.TokenMapper;
import com.tv.variety.mybatic.mapper.UserMapper;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.mybatic.service.UserService;
import com.tv.variety.param.UserAddParms;
import com.tv.variety.param.UserSecretParams;
import com.tv.variety.param.UserloginParas;
import com.tv.variety.util.JsonResult;
import com.tv.variety.util.MD5Utils;
import com.tv.variety.util.annotation.UnInterception;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

import static com.tv.variety.util.MD5Utils.convertMD5;
import static com.tv.variety.util.MD5Utils.string2MD5;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@RestController
//@Controller
@RequestMapping(value = "/API")
public class UserController implements IUserController {
//    @Autowired
//    private UserService userService;
//    @Resource
//    private UserMapper userMapper;
    @Autowired
    private IUserFacade userFacade;

    @Override
    @RequestMapping(value ="/addUser", method = RequestMethod.POST)

    public JsonResult<String> addUser(UserloginParas userAddParms) {


        if(userAddParms.getId().length()<6||userAddParms.getId().length()>18||userAddParms.getId()==""||userAddParms.getId()==null){
            return new JsonResult<>(-2,"账号不能低于6位数,最大不能超过18位,且不能为空");
        }
        if(userAddParms.getPassword().length()<6||userAddParms.getPassword().length()>18||userAddParms.getPassword()==""||userAddParms.getPassword()==null){
            return new JsonResult<>(-2,"密码不能低于6位数,最大不能超过18位,且不能为空");
        }


        int rs =userFacade.addUser(userAddParms);
        if(rs==0){
            return new JsonResult<>(-1,"该账号已被注册");
        }
        return new JsonResult<>(1,"注册成功");
    }

    @Override
    @RequestMapping(value = "/check" , method = RequestMethod.POST)
    public JsonResult<String> logincheck( UserloginParas resqUser) {
        MD5Utils md5Utils=new MD5Utils();
        //判断用户信息为空
        if ("".equals(resqUser.getId()) || "".equals(resqUser.getPassword())) {
//            result.setMsg("传入的用户名/密码为空！");
            return new JsonResult<String>(-1,"传入的用户名/密码为空！");
        }

        //根据客户用户名查找数据库的usre对象
//        User myUser = userMapper.selectById(resqUser.getId());
        User myUser=userFacade.searchUser(resqUser.getId());
        //判断用户不存在
        if (null == myUser) {
//            JsonResult.setMsg("用户不存在");
            return new JsonResult<String>(-2,"用户不存在");
        }
        String password=string2MD5(resqUser.getPassword());
        if (!password.equals(myUser.getPassword())) {

            return new JsonResult<String>(-3,"密码不正确");
        }

        //根据数据库的用户信息查询Token
//        Token token = tokenmapper.selectById(myUser.getId());
        Token token =userFacade.searchToken(myUser.getId());

        if (null == token) {
            userFacade.insertToken(myUser);
        }else{
            //登陆就更新Token信息
//            TokenStr = creatToken(myUser, date);
//            token.setToken(TokenStr);
//            token.setBuildtime(nowtime);
//            EntityWrapper<Token> wrapper = new EntityWrapper<Token>();
//            tokenmapper.update(token,wrapper.eq("userid",myUser.getId()));
            userFacade.updateToken(myUser);
        }
        String TokenStr=userFacade.searchToken(myUser.getId()).getToken();
        LoginSuccessParam loginSuccessParam=new LoginSuccessParam();
        loginSuccessParam.setId(myUser.getId());
        loginSuccessParam.setName(myUser.getName());
        loginSuccessParam.setIs_manage(myUser.getIsManage());
        loginSuccessParam.setToken(TokenStr);
        loginSuccessParam.setPicurl(myUser.getPicurl());

        //返回Token信息给客户端

        return new JsonResult(loginSuccessParam,"登陆成功",1);

    }

    @Override
    @RequestMapping(value = "/check2" , method = RequestMethod.POST)
    public JsonResult<String> logincheck2( UserloginParas resqUser) {
        MD5Utils md5Utils=new MD5Utils();
        //判断用户信息为空
        if ("".equals(resqUser.getId()) || "".equals(resqUser.getPassword())) {
//            result.setMsg("传入的用户名/密码为空！");
            return new JsonResult<String>(-1,"传入的用户名/密码为空！");
        }


        User myUser=userFacade.searchUser(resqUser.getId());

        String password=string2MD5(resqUser.getPassword());
        if (!password.equals(myUser.getPassword())) {

            return new JsonResult<String>(-3,"原密码不正确");
        }
        else {
            return new JsonResult<String>(1,"原密码正确");
        }


    }

    @Override
    @RequestMapping(value = "/updateHead" , method = RequestMethod.POST)
    public JsonResult updateHead(String id, String picurl) {
        if(id==null||id.equals(""))
        {
            return  new JsonResult(-1,"头像修改失败");
        }
        int rs=userFacade.updateHead(id,picurl);
        if (rs>0)
        {
            return  new JsonResult(1,"头像修改成功");
        }
        return  new JsonResult(-1,"失败");


    }

    @Override
    @RequestMapping(value ="/userHead", method = RequestMethod.POST)
    public JsonResult userHead(String userid) {
        if (userid==null||userid.trim().equals(""))
        {
            return new JsonResult("images/img.jpg","返回个人头像",1);
        }
        return new JsonResult(userFacade.userHead(userid),"返回个人头像",1);
    }

    @Override
    @RequestMapping(value ="/CountUserRatings", method = RequestMethod.POST)
    public JsonResult CountUserRatings() {
        return new JsonResult(userFacade.CountUserRatings(),"所有用户数",1);
    }


    @Override
    @RequestMapping(value ="/exit", method = RequestMethod.POST)
    public JsonResult<String> Exit(String userid) {
        int rs=userFacade.deletetoken(userid);
        if(rs==1){
            return new JsonResult<String>(1,"token删除成功，用户退出登录");
        }
        else {
            return new JsonResult<String>(-1,"该用户已退出登录");
        }

    }

    @Override
    @RequestMapping(value = "/index/userInform" , method = RequestMethod.POST)
    public JsonResult userInform(String userid) {
//        System.out.println(userid);
        UserInformParam userInformParam=new UserInformParam();
        userInformParam=userFacade.lookUserInform(userid);
        if (userInformParam==null||userid==null||userid.equals(""))
        {
            return new JsonResult(-1,"系统异常");
        }
        return new JsonResult(userInformParam,"返回个人成功",1);
    }

    @Override
    @RequestMapping(value = "/index/updateUserInform" , method = RequestMethod.POST)
    public JsonResult updateUserinform(UserInformParam userInformParam) {
        if(userInformParam==null||userInformParam.getId()==null||userInformParam.getId().equals(""))
        {
            return new JsonResult(userInformParam,"个人信息修改失败",-1);
        }
        int rs=userFacade.updateUserInform(userInformParam);
        return new JsonResult(userInformParam,"个人信息修改成功",1);

    }

    @Override
    @RequestMapping(value = "/User/updateSecret" , method = RequestMethod.POST)
    public JsonResult updateSecret(UserSecretParams userSecretParams) {
        if(userSecretParams==null||userSecretParams.getPassword()==null||userSecretParams.getPassword().trim().equals(""))
        {
            return new JsonResult(-1,"修改密码失败");
        }
        int rs=userFacade.updateUserSecret(userSecretParams);
        return  new JsonResult(1,"修改密码成功");
    }


//    @RequestMapping("/user")
//    public  JsonResult<List> startSpringBoot() {
//        List<User> users = userMapper.selectList(null);
//        return new JsonResult<>(users, "获取用户列表成功1");
//    }
}
