package com.tv.variety.controller;

import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.param.UpdateConfigpyParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigpyController {
    //修改爬虫配置表
    JsonResult updateConfigpy(UpdateConfigpyParams updateConfigpyParams);

    JsonResult getAllConfigpy();

    //根据id查询配置表的信息
    JsonResult showConfigpy(int id);

    //立即开始爬虫
    JsonResult actionPyNow(int id);

}
