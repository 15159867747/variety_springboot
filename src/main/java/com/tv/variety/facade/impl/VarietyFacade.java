package com.tv.variety.facade.impl;

//import com.miao.PageResult;
import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.bll.impl.VarietyMongoDB;
import com.tv.variety.dto.VarietyDetailsParam;
import com.tv.variety.facade.IRatingsFacade;
import com.tv.variety.facade.IVarietyFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.mongodb.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class VarietyFacade implements IVarietyFacade {
    @Autowired
    private IVarietyMongoDB varietyMongoDB;
    @Autowired
    private IRatingsBLL iRatingsBLL;

    @Override
    public VarietyDetailsParam findVarietyByName(String name,String userid) {
        Variety variety=new Variety();
        variety=varietyMongoDB.findVarietyByName(name);
        VarietyDetailsParam varietyDetailsParam=new VarietyDetailsParam();
        varietyDetailsParam.setVariety(variety);
        List<Ratings> ratingsList=iRatingsBLL.seracherRatings(userid,variety.getId());
        int ratings=0;
        if (ratingsList.size()>0)
        {
            ratings=ratingsList.get(0).getRatings();
        }
        varietyDetailsParam.setRatings(ratings);
        return varietyDetailsParam;
    }

    @Override
    public PageResult<VarietyParams> findVarietyByType(String type) {
        return varietyMongoDB.findVarietyByType(type);
    }
}
