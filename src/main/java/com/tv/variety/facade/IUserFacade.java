package com.tv.variety.facade;

import com.tv.variety.dto.UserInformParam;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.TokenParams;
import com.tv.variety.param.UserAddParms;
import com.tv.variety.param.UserSecretParams;
import com.tv.variety.param.UserloginParas;

import java.util.Date;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IUserFacade {
    //用户注册
    int addUser(UserloginParas userloginParas);

    //用户登录验证
    int check(String userid,String password);

    //添加用户时检查该账号是否存在
    int check(String userid);

    //根据客户用户名查找数据库的usre对象
    User searchUser(String id);

    //根据数据库的用户id信息查询Token
    Token searchToken(String id);

    //插入token信息
    int insertToken(User user);

    //更新Token信息
    int updateToken(User user);

    //创建tokena
    String creatToken(User user ,Date date);

    //查询用户信息
    UserInformParam lookUserInform(String userid);

    //更新用户信息
    int updateUserInform(UserInformParam userInformParam);

    //修改用户的密码
    int updateUserSecret(UserSecretParams userSecretParams);
    //删除token
    int deletetoken(String userid);

    //修改头像
    int updateHead(String id,String picurl);

    //查询用户头像
    String userHead(String userid);

    //查询有过评星记录的用户
    int CountUserRatings();

}