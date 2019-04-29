package com.tv.variety.facade;

import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.param.InsertRatingsParams;

import java.util.List;

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

}
