package com.tv.variety.facade.impl;

import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.facade.IRatingsFacade;
import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.param.InsertRatingsParams;
import com.tv.variety.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class RatingsFacade implements IRatingsFacade {
    @Autowired
    private IRatingsBLL iRatingsBLL;


    @Override
    public int insertRatings(InsertRatingsParams insertRatingsParams) {
        Date date = new Date();
        long nowtime = (long) (date.getTime());
        Ratings ratings=new Ratings();
        ratings.setId(UUIDGenerator.getUUID());
        ratings.setRatings(insertRatingsParams.getRatings());
        ratings.setTime(nowtime);
        ratings.setUserid(insertRatingsParams.getUserid());
        ratings.setVarietyId(insertRatingsParams.getVarietyId());
        int rs =iRatingsBLL.insertRatings(ratings);
        return rs;
    }

    @Override
    public int updateRatings(InsertRatingsParams insertRatingsParams) {
        Date date = new Date();
        long nowtime = (long) (date.getTime());
        Ratings ratings=new Ratings();
        ratings.setRatings(insertRatingsParams.getRatings());
        ratings.setUserid(insertRatingsParams.getUserid());
        ratings.setVarietyId(insertRatingsParams.getVarietyId());
        ratings.setTime(nowtime);
        int rs =iRatingsBLL.updateRatings(ratings);
        return rs;
    }

    @Override
    public InsertRatingsParams seracherRatings(String userid, String varietyId) {
        List<Ratings> ratings=iRatingsBLL.seracherRatings(userid,varietyId);
        InsertRatingsParams insertRatingsParams=new InsertRatingsParams();
        if (ratings.size()>0)
        {
            insertRatingsParams.setUserid(ratings.get(0).getUserid());
            insertRatingsParams.setRatings(ratings.get(0).getRatings());
            insertRatingsParams.setVarietyId(ratings.get(0).getVarietyId());
        }

        return insertRatingsParams;
    }
}
