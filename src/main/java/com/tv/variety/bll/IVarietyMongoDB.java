package com.tv.variety.bll;


import com.tv.variety.mongodb.POJO.Variety;

import com.tv.variety.util.mongodb.PageResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */

public interface IVarietyMongoDB {


    //根据综艺名查询综艺的节目信息
    Variety findVarietyByName(String name);

    //根据综艺类型查询该类型下的所有节目
    PageResult findVarietyByType(String type);



}
