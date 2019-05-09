package com.tv.variety.bll;

import com.tv.variety.mybatic.model.Configpy;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigPythonBLL {
    //查询爬虫配置表
    Configpy showConfigpy(int id);

    //查询所有的爬虫配置信息
    List<Configpy> showConfigpyAll();

    //修改配置表的信息
    int update(Configpy configpy);

    //根据id查询配置表的信息
    Configpy showConfigpy(String id);
}
