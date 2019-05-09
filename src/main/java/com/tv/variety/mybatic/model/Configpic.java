package com.tv.variety.mybatic.model;

import com.baomidou.mybatisplus.annotations.TableField;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-05-07
 */
public class Configpic implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private String name;
    @TableField("varietyId")
    private String varietyId;
    private String picurl;
    private String detail;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVarietyId() {
        return varietyId;
    }

    public void setVarietyId(String varietyId) {
        this.varietyId = varietyId;
    }

    public String getPicurl() {
        return picurl;
    }

    public void setPicurl(String picurl) {
        this.picurl = picurl;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    @Override
    public String toString() {
        return "Configpic{" +
        ", id=" + id +
        ", name=" + name +
        ", varietyId=" + varietyId +
        ", picurl=" + picurl +
        ", detail=" + detail +
        "}";
    }
}
