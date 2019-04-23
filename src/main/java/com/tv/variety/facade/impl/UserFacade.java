package com.tv.variety.facade.impl;

import com.tv.variety.bll.IUserBLL;
import com.tv.variety.bll.impl.UserBLL;
import com.tv.variety.facade.IUserFacade;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.model.User;
import com.tv.variety.param.TokenParams;
import com.tv.variety.param.UserAddParms;
import com.tv.variety.util.UUIDGenerator;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tv.variety.util.MD5Utils;

import java.util.Date;
import java.util.UUID;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class UserFacade implements IUserFacade {
    @Autowired
    private IUserBLL userBLL;

    @Override
    public int addUser(UserAddParms userAddParms) {
        MD5Utils md5Utils=new MD5Utils();
        String userid=userAddParms.getUserid();
        //String password=user.getPassword();
        //String password=md5Utils.string2MD5(user.getPassword());
        //对密码进行加密

        //数据库已经有该用户账号
        if (userBLL.check(userid)==1){
            return 0;
        }
        User user =new User();
        //初始化User
        user.setPassword(md5Utils.string2MD5(userAddParms.getPassword()));
        user.setId(userAddParms.getUserid());
        user.setName(userAddParms.getName());
        user.setBirthday(userAddParms.getBirthday());
        user.setSex(userAddParms.getSex());
        int rs=userBLL.addUser(user);
        return rs;

    }

    @Override
    public int check(String userid, String password) {

        return 0;
    }

    @Override
    public int check(String userid) {
        return userBLL.check(userid);
    }

    @Override
    public User searchUser(String id) {

        return userBLL.searchUser(id);
    }

    @Override
    public Token searchToken(String id) {
        if (userBLL.searchToken(id).size()>0){
            return userBLL.searchToken(id).get(0);
        }
        else{
            return null;
        }

    }

    @Override
    public int insertToken(User user) {
        String TokenStr = "";
        Date date = new Date();
        long nowtime = (int) (date.getTime() / 1000);
        //生成Token
        TokenStr = creatToken(user, date);
        Token token = new Token();
        token.setTokenid(UUIDGenerator.getUUID());
        token.setToken(TokenStr);
        token.setBuildtime(nowtime);
        token.setUserid(user.getId());
        //插入token到数据库

        return userBLL.insertToken(token);
    }

    @Override
    public int updateToken(User user) {
        //有token，但是重新登录，所以更新Token信息
        String TokenStr = "";
        Date date = new Date();
        long nowtime = (int) (date.getTime() / 1000);
        TokenStr = creatToken(user, date);
        Token token = new Token();

        token.setToken(TokenStr);
        token.setBuildtime(nowtime);
        token.setUserid(user.getId());
        return userBLL.updateToken(token);
    }

    @Override
    public String creatToken(User user, Date date) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT") // 设置header
                .setHeaderParam("alg", "HS256").setIssuedAt(date) // 设置签发时间
                .setExpiration(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 3))
                .claim("userid",String.valueOf(user.getId()) ) // 设置内容
                .setIssuer("lws")// 设置签发人
                .signWith(signatureAlgorithm, "dahao"); // 签名，需要算法和key
        String jwt = builder.compact();
        return jwt;
    }
}
