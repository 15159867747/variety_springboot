package com.tv.variety.bll;

import com.baomidou.mybatisplus.plugins.Page;
import com.tv.variety.mybatic.model.Comment;


import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface ICommentBLL {
    //显示该节目下所有评论
    Page<Comment> getCommentList(String varietyId, int pageNum, int pageSize);

    //对该节目进行评价
    int insertComment(Comment comment);

    //删除评价
    int deleteComment(String id);

    //显示该用户评论过的节目
    Page<Comment> getCommentListByUserid(String userid,int pageNum,int pageSize);



}
