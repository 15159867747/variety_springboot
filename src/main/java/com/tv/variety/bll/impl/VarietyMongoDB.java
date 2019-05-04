package com.tv.variety.bll.impl;


import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.mongodb.MongoPageHelper;
import com.tv.variety.util.mongodb.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Component
//@Service
public class VarietyMongoDB implements IVarietyMongoDB {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private MongoPageHelper mongoPageHelper;




    @Override
    public Variety findVarietyByName(String name) {
        Query query=new Query(Criteria.where("name").is(name));
        Variety vatiety =  mongoTemplate.findOne(query , Variety.class);
        return vatiety;

    }

    @Override
    public PageResult<VarietyParams> findVarietyByType(String type ) {
//        MongoPageHelper mongoPageHelper=new MongoPageHelper();
//        Sort sort = new Sort(Sort.Direction.ASC, "DEVID").and(new Sort(Sort.Direction.ASC, "TIME"));//多条件DEVID、time

        final Query query = new Query(Criteria.where("type").is(type));
        query.with(new Sort(Sort.Direction.DESC, "update"));
        return mongoPageHelper.pageQuery(query, Variety.class, 14,
                1,variety->{
                VarietyParams varietyParams1=new VarietyParams();
                varietyParams1.setId(variety.getId());
                varietyParams1.setName(variety.getName());
                varietyParams1.setPicurl(variety.getPicurl());
                varietyParams1.setUpdate(variety.getUpdate());
                return varietyParams1;}
                , null);


    }

    @Override
    public Variety findVarietyById(String id) {
        Query query=new Query(Criteria.where("id").is(id));
        Variety vatiety =  mongoTemplate.findOne(query , Variety.class);
        return vatiety;
    }

}
