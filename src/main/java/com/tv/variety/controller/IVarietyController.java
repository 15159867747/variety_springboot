package com.tv.variety.controller;

//import com.miao.PageResult;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IVarietyController {
    //通过节目名找节目
    JsonResult findvarietyByName(String name,String userid);

    //通过类型找节目
    JsonResult findVarietyByType(String type);

    JsonResult findvarietyById(String id,String name);

    JsonResult searcherVarietyAll(String all,int pageNum,int pageSize);

    JsonResult getAllVariety();

    JsonResult findVarietyByTypeOrArea(String area,String type,int pageNum,int pageSize);

    JsonResult findVarietyByType(String type,String name);

    JsonResult recommend(String userid,String type);


}
