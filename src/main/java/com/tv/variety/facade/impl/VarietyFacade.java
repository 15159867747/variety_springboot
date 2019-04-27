package com.tv.variety.facade.impl;

import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.bll.impl.VarietyMongoDB;
import com.tv.variety.facade.IVarietyFacade;
import com.tv.variety.mongodb.POJO.Variety;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class VarietyFacade implements IVarietyFacade {
    @Autowired
    private IVarietyMongoDB varietyMongoDB;


    @Override
    public Variety findVarietyByName(String name) {
        Variety variety=new Variety();
        variety=varietyMongoDB.findVarietyByName(name);
        return variety;
    }
}
