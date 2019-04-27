package com.tv.variety.bll.impl;

import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.mongodb.POJO.Variety;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Component
//@Service
public class VarietyMongoDB implements IVarietyMongoDB {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Variety findVarietyByName(String name) {
        Query query=new Query(Criteria.where("name").is(name));
        Variety vatiety =  mongoTemplate.findOne(query , Variety.class);
        return vatiety;

    }
}
