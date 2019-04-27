package com.tv.variety.facade;

import com.tv.variety.mongodb.POJO.Variety;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IVarietyFacade {

    //根据综艺名查找综艺的详细信息
    Variety findVarietyByName(String name);
}
