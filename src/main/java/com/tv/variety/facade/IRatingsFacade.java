package com.tv.variety.facade;

import com.tv.variety.dto.FindRatingsByUseridParams;
import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.param.InsertRatingsParams;

import java.util.List;
import java.util.Map;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IRatingsFacade {
    //新增评分
    int insertRatings(InsertRatingsParams insertRatingsParams);

    //修改评分
    int updateRatings(InsertRatingsParams insertRatingsParams);

    //查询评分
    InsertRatingsParams seracherRatings(String userid, String varietyId);

    //查询用户所有的评星
    Map<String, Object> findRatingsByUserid(String userid, int pageNum, int pageSize);

    //删除用户评星
    int deleteRatings(String id);


}
