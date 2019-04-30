package com.tv.variety.facade;

import com.tv.variety.mybatic.model.Comment;
import com.tv.variety.param.InsertCommentParams;

import java.util.List;
import java.util.Map;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface ICommentFacade {

    //获取该节目的第一页的评论
    Map<String, Object> getCommentList(String varietyId, int pageNum, int pageSize);

    //新增评论
    int insertComment(InsertCommentParams insertCommentParams);

    //删除评论
    int deleteComment(String id);

    //该用户评论过的节目
    Map<String, Object> getCommentListByUserid(String userid, int pageNum, int pageSize);
}
