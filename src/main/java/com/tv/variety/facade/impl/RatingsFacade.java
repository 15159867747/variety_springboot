package com.tv.variety.facade.impl;

import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.dto.FindRatingsByUseridParams;
import com.tv.variety.facade.IRatingsFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.param.InsertRatingsParams;
import com.tv.variety.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class RatingsFacade implements IRatingsFacade {
    @Autowired
    private IRatingsBLL iRatingsBLL;
    @Autowired
    private IVarietyMongoDB iVarietyMongoDB;

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

    @Override
    public Map<String, Object> findRatingsByUserid(String userid, int pageNum, int pageSize) {

        List<Ratings> ratings=new ArrayList<Ratings>();
        Map<String, Object> resultMap = new HashMap<String, Object>();

        List<FindRatingsByUseridParams> findRatingsByUseridParamsList=new ArrayList<FindRatingsByUseridParams>();

        ratings=iRatingsBLL.getRatingsListByUserid(userid,pageNum,pageSize).getRecords();
        for (int i=0;i<ratings.size();i++)
        {
            FindRatingsByUseridParams findRatingsByUseridParams=new FindRatingsByUseridParams();
            Variety variety=new Variety();
            findRatingsByUseridParams.setRatings(ratings.get(i).getRatings());
            findRatingsByUseridParams.setTime(ratings.get(i).getTime());
            findRatingsByUseridParams.setVarietyId(ratings.get(i).getVarietyId());
            findRatingsByUseridParams.setId(ratings.get(i).getId());

//            System.out.println(comments.get(i).getName());
//            System.out.println(comments.get(i).getName());
            variety=iVarietyMongoDB.findVarietyById(ratings.get(i).getVarietyId());
//            System.out.println("url"+variety.getPicurl());
            findRatingsByUseridParams.setVarietyName(variety.getName());
            findRatingsByUseridParams.setPicurl(variety.getPicurl());


            findRatingsByUseridParamsList.add(findRatingsByUseridParams);

        }
        int total=iRatingsBLL.getRatingsListByUserid(userid,pageNum,pageSize).getTotal();
        resultMap.put("total", total);
        resultMap.put("list", findRatingsByUseridParamsList);
        return resultMap;
    }

    @Override
    public int deleteRatings(String id) {
        return iRatingsBLL.deleteRatings(id);
    }

    @Override
    public int checkUserRatings(String userid) {
        return iRatingsBLL.checkUserRating(userid);
    }

    @Override
    public int countUserRatings() {
        return iRatingsBLL.countUserRatings();
    }

    @Override
    public int countVarietyRatings() {
        return iRatingsBLL.countVarietyRatings();
    }

    @Override
    public int countDistinctUserRatings() {
        return iRatingsBLL.countDistinctUserRatings();
    }
}


