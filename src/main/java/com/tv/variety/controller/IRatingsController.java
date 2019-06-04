package com.tv.variety.controller;

import com.tv.variety.param.InsertRatingsParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IRatingsController {
    //新增评分
    JsonResult updateORinsertRatings(InsertRatingsParams insertRatingsParams);
//    //修改评分
//    JsonResult updateRatings(InsertRatingsParams insertRatingsParams);
    //查询评分
    JsonResult seracherRatings(String userid, String varietyId);

    //用户下所有的评星
    JsonResult getRatingsByUserid(String userid, int pageNum, int pageSize);

    //删除评星
    JsonResult getRatingsByUserid(String id);

    //查询总评星数
    JsonResult countUserRatings();

    //查询有被评星的节目数
    JsonResult countVarietyRatings();

    //查询有评星的用户数
    JsonResult countDistinctUserRatings();

    //查询总评星数 限制时间
    JsonResult countUserRatings(long time);
}
