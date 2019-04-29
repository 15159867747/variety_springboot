package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.mybatic.mapper.RatingsMapper;
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
}
