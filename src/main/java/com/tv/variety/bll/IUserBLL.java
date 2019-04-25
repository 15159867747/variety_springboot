package com.tv.variety.bll;

import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.TokenParams;

import java.util.Date;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IUserBLL {
    //用户注册
    int addUser(User user);

    //判断用户登录
    int check(String userid,String password);

    //添加用户时，判断用户账号是否存在
    int check(String userid);

    //根据客户用户名查找数据库的usre对象
    User searchUser(String id);

    //根据数据库的用户id信息查询Token
    List<Token> searchToken(String id);

    //插入token信息
    int insertToken(Token token);

    //更新Token信息
    int updateToken(Token token);

    //删除用户的token信息退出登录
    int deleteToken(String userid);


}
