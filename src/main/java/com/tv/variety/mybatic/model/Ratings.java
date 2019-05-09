package com.tv.variety.mybatic.model;

import com.baomidou.mybatisplus.annotations.TableField;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-29
 */
public class Ratings implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    private String id;
    /**
     * 评分
     */
    private Integer ratings;
    /**
     * 评分时间
     */
    private Long time;
    /**
     * 评分人
     */
    private String userid;
    /**
     * 节目id
     */
    @TableField("varietyId")
    private String varietyId;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRatings() {
        return ratings;
    }

    public void setRatings(Integer ratings) {
        this.ratings = ratings;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getVarietyId() {
        return varietyId;
    }

    public void setVarietyId(String varietyId) {
        this.varietyId = varietyId;
    }

    @Override
    public String toString() {
        return "Ratings{" +
        ", id=" + id +
        ", ratings=" + ratings +
        ", time=" + time +
        ", userid=" + userid +
        ", varietyId=" + varietyId +
        "}";
    }
}
