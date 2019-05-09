package com.tv.variety.facade;

import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.param.UpdateConfigpyParams;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigpyFacade {

    //修改配置表的信息
    int updateConfigpy(UpdateConfigpyParams updateConfigpyParams);

    //显示爬虫配置信息
    List<Configpy> showConfigpyAll();

    //根据id查询配置表的信息
    Configpy showConfigpy(int id);

    //根据id修改配置表的执行状态
    int updateConfigpy(int id,int status);
}
