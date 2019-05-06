package com.tv.variety.bll;


import com.tv.variety.dto.SearchVarietyparams;
import com.tv.variety.mongodb.POJO.Variety;

import com.tv.variety.util.mongodb.PageResult;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */

public interface IVarietyMongoDB {


    //根据综艺名查询综艺的节目信息
    Variety findVarietyByName(String name);

    //根据综艺类型查询该类型下的所有节目
    PageResult findVarietyByType(String type);

    //根据id查是否有该节目
    Variety findVarietyById(String id);

    //搜索节目
    PageResult<SearchVarietyparams> search(String all,int pageNum,int pageSize);




}
