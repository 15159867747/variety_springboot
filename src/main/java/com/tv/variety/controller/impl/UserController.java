package com.tv.variety.controller.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.controller.IUserController;
import com.tv.variety.facade.IUserFacade;
import com.tv.variety.facade.impl.UserFacade;
import com.tv.variety.mybatic.mapper.TokenMapper;
import com.tv.variety.mybatic.mapper.UserMapper;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.mybatic.service.UserService;
import com.tv.variety.param.UserAddParms;
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
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TokenMapper tokenmapper;
    @Override
    @RequestMapping(value ="/addUser", method = RequestMethod.POST)

    public JsonResult<String> addUser(@RequestBody UserAddParms userAddParms) {
        System.out.println(userAddParms);
        int rs =userFacade.addUser(userAddParms);
        if(rs==0){
            return new JsonResult<>(-1,"该账号已被注册");
        }
        return new JsonResult<>(1,"注册成功");
    }

    @Override
    @RequestMapping(value = "/check")
//    @UnInterception
//    @UnInterception
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
        //为生成Token准备
//        String TokenStr = "";
//        Date date = new Date();
//        long nowtime = (int) (date.getTime() / 1000);
//        //生成Token
//        TokenStr = creatToken(myUser, date);
        if (null == token) {
            //没有token需要登陆
//            token = new Token();
//            token.setToken(TokenStr);
//            token.setBuildtime(nowtime);
//            token.setUserid(myUser.getId());
//            tokenmapper.insert(token);
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
        //返回Token信息给客户端

        return new JsonResult<String>(TokenStr,"登陆成功",1);

    }

    @Override
    @RequestMapping(value ="/exit", method = RequestMethod.DELETE)
    public JsonResult<String> Exit(String userid) {
        return null;
    }



//    @RequestMapping("/user")
//    public  JsonResult<List> startSpringBoot() {
//        List<User> users = userMapper.selectList(null);
//        return new JsonResult<>(users, "获取用户列表成功1");
//    }
}
