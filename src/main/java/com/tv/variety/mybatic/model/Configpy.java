package com.tv.variety.mybatic.model;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-05-29
 */
public class Configpy implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String name;
    /**
     * 0：立即执行
     */
    private Long actiontime;
    /**
     * 1：正在执行；0：待执行；-1：失败；2：执行完成
     */
    private Integer status;
    private String userid;
    private Long updatetime;


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

    public Long getActiontime() {
        return actiontime;
    }

    public void setActiontime(Long actiontime) {
        this.actiontime = actiontime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Long getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Long updatetime) {
        this.updatetime = updatetime;
    }

    @Override
    public String toString() {
        return "Configpy{" +
        ", id=" + id +
        ", name=" + name +
        ", actiontime=" + actiontime +
        ", status=" + status +
        ", userid=" + userid +
        ", updatetime=" + updatetime +
        "}";
    }
}
