package com.tv.variety.bll;

import com.tv.variety.mongodb.POJO.Variety;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */

public interface IVarietyMongoDB {


    //根据综艺名查询综艺的节目信息
    Variety findVarietyByName(String name);
}
