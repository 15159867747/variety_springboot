package com.tv.variety.controller;

//import com.miao.PageResult;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IVarietyController {
    JsonResult findvarietyByName(String name,String userid);

    JsonResult findVarietyByType(String type);

    JsonResult findvarietyById(String id,String name);

    JsonResult searcherVarietyAll(String all,int pageNum,int pageSize);

    JsonResult getAllVariety();


}
