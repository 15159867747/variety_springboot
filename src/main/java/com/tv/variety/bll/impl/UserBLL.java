package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.IUserBLL;
import com.tv.variety.mybatic.mapper.TokenMapper;
import com.tv.variety.mybatic.mapper.UserMapper;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.TokenParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class UserBLL implements IUserBLL {
    @Resource
    UserMapper userMapper;
    @Resource
    TokenMapper tokenMapper;
    @Override
    public int addUser(User user) {
        int c=userMapper.insert(user);
        return c;
    }

    @Override
    public int check(String userid, String password) {

        EntityWrapper<User> wrapper = new EntityWrapper<User>();
        wrapper.eq("id", userid).eq("password",password);
        return userMapper.selectCount(wrapper);
    }

    @Override
    public int check(String userid) {
        EntityWrapper<User> wrapper = new EntityWrapper<User>();
        wrapper.eq("id", userid);
        return userMapper.selectCount(wrapper);
    }

    @Override
    public User searchUser(String id) {
        return userMapper.selectById(id);
    }

    @Override
    //id 为用户的账号
    public List<Token> searchToken(String id) {
        EntityWrapper<Token> wrapper = new EntityWrapper<Token>();
        wrapper.eq("userid", id);
        return tokenMapper.selectList(wrapper);
    }

    @Override
    public int insertToken(Token token) {
        return tokenMapper.insert(token);
    }

    @Override
    public int updateToken(Token token) {
        EntityWrapper<Token> wrapper = new EntityWrapper<Token>();
        wrapper.eq("userid", token.getUserid());
        int i =tokenMapper.update(token,wrapper);
        return i;
    }

    @Override
    public int deleteToken(String userid) {
        EntityWrapper<Token> wrapper = new EntityWrapper<Token>();
        wrapper.eq("userid", userid);
        int i =tokenMapper.delete(wrapper);
        return i;
    }

    @Override
    public User lookUserInform(String userid) {
        User user =userMapper.selectById(userid);
        return user;
    }

    @Override
    public int updateUserInform(User user) {
        EntityWrapper<User> wrapper = new EntityWrapper<User>();
        wrapper.eq("id", user.getId());
        int i =userMapper.update(user,wrapper);
        return i;
    }

    @Override
    public List<User> allUser() {
        EntityWrapper<User> wrapper = new EntityWrapper<User>();
        wrapper.notIn("id","");
        List<User> alluser=userMapper.selectList(wrapper);
        return alluser;
    }

    @Override
    public int CountUserNumber() {
        EntityWrapper<User> wrapper = new EntityWrapper<User>();
       wrapper.notIn("id","");

        return userMapper.selectCount(wrapper);
//        return userMapper.CountUserComment();
    }


}
