package com.tv.variety.mybatic.model;

import java.io.Serializable;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author yrongqin
 * @since 2019-05-13
 */
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String id;
    /**
     * 用户名
     */
    private String name;
    private Long birthday;
    private String sex;
    private String password;
    /**
     * 是否为管理员（1管理员，0普通用户），默认0
     */
    private Integer isManage;
    private String picurl;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getBirthday() {
        return birthday;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getIsManage() {
        return isManage;
    }

    public void setIsManage(Integer isManage) {
        this.isManage = isManage;
    }

    public String getPicurl() {
        return picurl;
    }

    public void setPicurl(String picurl) {
        this.picurl = picurl;
    }

    @Override
    public String toString() {
        return "User{" +
        ", id=" + id +
        ", name=" + name +
        ", birthday=" + birthday +
        ", sex=" + sex +
        ", password=" + password +
        ", isManage=" + isManage +
        ", picurl=" + picurl +
        "}";
    }
}
