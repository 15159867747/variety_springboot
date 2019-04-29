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
}
