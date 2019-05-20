package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tv.variety.bll.IRatingsBLL;

import com.tv.variety.mybatic.mapper.RatingsMapper;
import com.tv.variety.mybatic.mapper.SqlRatingsMapper;
import com.tv.variety.mybatic.model.Ratings;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class RatingsBLL implements IRatingsBLL {
    @Resource
    RatingsMapper ratingsMapper;
    @Resource
    SqlRatingsMapper sqlRatingsMapper;
    @Override
    public int insertRatings(Ratings ratings) {

        int i=ratingsMapper.insert(ratings);

        return i;
    }

    @Override
    public int updateRatings(Ratings ratings) {
        EntityWrapper<Ratings> wrapper = new EntityWrapper<Ratings>();
        wrapper.eq("userid",ratings.getUserid()).eq("varietyId",ratings.getVarietyId());
        int i =ratingsMapper.update(ratings,wrapper);
        return i;
    }

    @Override
    public List<Ratings> seracherRatings(String userid, String varietyId) {
        EntityWrapper<Ratings> wrapper = new EntityWrapper<Ratings>();
        wrapper.eq("userid",userid).eq("varietyId",varietyId);
        return ratingsMapper.selectList(wrapper);
    }

    @Override
    public Page<Ratings> getRatingsListByUserid(String userid, int pageNum, int pageSize) {
        Page<Ratings> page=new Page<Ratings>(pageNum,pageSize);
        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
        entityWrapper.eq("userid",userid).orderBy("time");
        List<Ratings> ratingsList= ratingsMapper.selectPage(page,entityWrapper);
        page.setRecords(ratingsList);
        return page;
    }

    @Override
    public int deleteRatings(String id) {
        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
        entityWrapper.eq("id",id);
        int rs=ratingsMapper.delete(entityWrapper);
        return rs;
    }

    @Override
    public int checkUserRating(String user, String varietyid) {
        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
        entityWrapper.eq("userid",user).eq("varietyId",varietyid);
        int rs=ratingsMapper.selectCount(entityWrapper);
        return rs;
    }

    @Override
    public int checkUserRating(String user) {
        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
        entityWrapper.eq("userid",user);
        int rs=ratingsMapper.selectCount(entityWrapper);
        return rs;
    }

    @Override
    public int countUserRatings() {
        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
        entityWrapper.notIn("id","");
        int rs=ratingsMapper.selectCount(entityWrapper);
        return rs;
    }

    @Override
    public int countVarietyRatings() {
//        EntityWrapper<Ratings> entityWrapper=new EntityWrapper<Ratings>();
//        entityWrapper.setSqlSelect("count(DISTINCT(varietyId))");
//        int rs=ratingsMapper.selectCount(entityWrapper);
//        return rs;
        return sqlRatingsMapper.selectCountRatings();
    }

    @Override
    public int countDistinctUserRatings() {
        return sqlRatingsMapper.selectCountUserRatings();
    }
}
