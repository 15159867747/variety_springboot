package com.tv.variety.facade.impl;

import com.tv.variety.bll.ICommentBLL;
import com.tv.variety.facade.ICommentFacade;
import com.tv.variety.mybatic.model.Comment;
import com.tv.variety.param.InsertCommentParams;
import com.tv.variety.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class CommentFacade implements ICommentFacade {
    @Autowired
    private ICommentBLL iCommentBLL;


    @Override
    public Map<String, Object> getCommentList(String varietyId, int pageNum, int pageSize) {
        List<Comment> comments=new ArrayList<Comment>();
        Map<String, Object> resultMap = new HashMap<String, Object>();

        comments=iCommentBLL.getCommentList(varietyId,pageNum,pageSize).getRecords();
        int total=iCommentBLL.getCommentList(varietyId,pageNum,pageSize).getTotal();
        resultMap.put("total", total);
        resultMap.put("list", comments);
        return resultMap;
    }

    @Override
    public int insertComment(InsertCommentParams insertCommentParams) {

        Comment comment=new Comment();
        Date date = new Date();
        long nowtime = (long) (date.getTime());
        comment.setId(UUIDGenerator.getUUID());
        comment.setComment(insertCommentParams.getComment());
        comment.setUserid(insertCommentParams.getUserid());
        comment.setCommentDate(nowtime);
        comment.setVarietyId(insertCommentParams.getVarietyId());
        int rs =iCommentBLL.insertComment(comment);
        return rs;
    }

    @Override
    public int deleteComment(String id) {
        int rs=iCommentBLL.deleteComment(id);
        return rs;
    }

    @Override
    public Map<String, Object> getCommentListByUserid(String userid, int pageNum, int pageSize) {
        List<Comment> comments=new ArrayList<Comment>();
        Map<String, Object> resultMap = new HashMap<String, Object>();

        comments=iCommentBLL.getCommentListByUserid(userid,pageNum,pageSize).getRecords();
        int total=iCommentBLL.getCommentListByUserid(userid,pageNum,pageSize).getTotal();
        resultMap.put("total", total);
        resultMap.put("list", comments);
        return resultMap;
    }
}
