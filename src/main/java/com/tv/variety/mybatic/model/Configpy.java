package com.tv.variety.mybatic.model;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author yrongqin
 * @since 2019-05-08
 */
public class Configpy implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private String name;
    /**
     * 0：立即执行
     */
    private Long actiontime;
    /**
     * 1：正在执行；0：待执行；-1：无执行任务
     */
    private Integer status;


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

    @Override
    public String toString() {
        return "Configpy{" +
        ", id=" + id +
        ", name=" + name +
        ", actiontime=" + actiontime +
        ", status=" + status +
        "}";
    }
}
