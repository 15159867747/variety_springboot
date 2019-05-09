package com.tv.variety.mybatic.model;

import com.baomidou.mybatisplus.annotations.TableField;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-30
 */
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String userid;
    @TableField("varietyId")
    private String varietyId;
    private String comment;
    @TableField("commentDate")
    private Long commentDate;
    private String name;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Long commentDate) {
        this.commentDate = commentDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Comment{" +
        ", id=" + id +
        ", userid=" + userid +
        ", varietyId=" + varietyId +
        ", comment=" + comment +
        ", commentDate=" + commentDate +
        ", name=" + name +
        "}";
    }
}
