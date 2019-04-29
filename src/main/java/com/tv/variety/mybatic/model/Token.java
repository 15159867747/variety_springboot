package com.tv.variety.mybatic.model;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-29
 */
public class Token implements Serializable {

    private static final long serialVersionUID = 1L;

    private String tokenid;
    private String userid;
    private String token;
    private Long buildtime;


    public String getTokenid() {
        return tokenid;
    }

    public void setTokenid(String tokenid) {
        this.tokenid = tokenid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getBuildtime() {
        return buildtime;
    }

    public void setBuildtime(Long buildtime) {
        this.buildtime = buildtime;
    }

    @Override
    public String toString() {
        return "Token{" +
        ", tokenid=" + tokenid +
        ", userid=" + userid +
        ", token=" + token +
        ", buildtime=" + buildtime +
        "}";
    }
}
