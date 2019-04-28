package com.tv.variety.facade;


import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.mongodb.PageResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IVarietyFacade {

    //根据综艺名查找综艺的详细信息
    Variety findVarietyByName(String name);

    PageResult<VarietyParams> findVarietyByType(String type);
}
