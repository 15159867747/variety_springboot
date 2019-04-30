package com.tv.variety.controller;

import com.tv.variety.param.InsertCommentParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface ICommentController {
    //显示该节目下的评论
    JsonResult getCommentList(String varietyId, int pageNum, int pageSize);

    //增加评论
    JsonResult insertComment(InsertCommentParams insertCommentParams);

    //删除评论
    JsonResult deleteComment(String id);

    //显示用户评论过的节目
    JsonResult getCommentListByUserid(String userid, int pageNum, int pageSize);



}
