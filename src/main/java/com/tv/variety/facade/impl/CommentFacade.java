package com.tv.variety.facade.impl;

import com.tv.variety.bll.ICommentBLL;
import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.dto.CommentParams;
import com.tv.variety.dto.MyCommentParams;
import com.tv.variety.facade.ICommentFacade;
import com.tv.variety.facade.IUserFacade;
import com.tv.variety.mongodb.POJO.Variety;
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
    @Autowired
    private IVarietyMongoDB iVarietyMongoDB;
    @Autowired
    private IUserFacade iUserFacade;
    @Override
    public Map<String, Object> getCommentList(String varietyId, int pageNum, int pageSize) {
        List<Comment> comments=new ArrayList<Comment>();
        Map<String, Object> resultMap = new HashMap<String, Object>();

        comments=iCommentBLL.getCommentList(varietyId,pageNum,pageSize).getRecords();
        List<CommentParams> commentParamsList=new ArrayList<CommentParams>();
        for (int i=0;i<comments.size();i++)
        {
            CommentParams commentParams=new CommentParams();

            commentParams.setComment(comments.get(i).getComment());
            commentParams.setCommentDate(comments.get(i).getCommentDate());
            commentParams.setId(comments.get(i).getId());
            commentParams.setName(comments.get(i).getName());
            commentParams.setUserid(comments.get(i).getUserid());
            commentParams.setVarietyId(comments.get(i).getVarietyId());

            commentParams.setPicurl(iUserFacade.userHead(comments.get(i).getUserid()));
            commentParamsList.add(commentParams);
        }



        int total=iCommentBLL.getCommentList(varietyId,pageNum,pageSize).getTotal();
        resultMap.put("total", total);
        resultMap.put("list", commentParamsList);
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
        comment.setName(insertCommentParams.getName());
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
        List<MyCommentParams> myCommentParamsList=new ArrayList<MyCommentParams>();
        comments=iCommentBLL.getCommentListByUserid(userid,pageNum,pageSize).getRecords();
        for (int i=0;i<comments.size();i++)
        {
            MyCommentParams myCommentParams=new MyCommentParams();
            Variety variety=new Variety();

            myCommentParams.setId(comments.get(i).getId());
            myCommentParams.setVarietyId(comments.get(i).getVarietyId());
            myCommentParams.setCommentDate(comments.get(i).getCommentDate());
            myCommentParams.setComment(comments.get(i).getComment());
//            System.out.println(comments.get(i).getName());
//            System.out.println(comments.get(i).getName());
            variety=iVarietyMongoDB.findVarietyById(comments.get(i).getVarietyId());
//            System.out.println("url"+variety.getPicurl());
            myCommentParams.setPicurl(variety.getPicurl());
            myCommentParams.setName(variety.getName());


            myCommentParamsList.add(myCommentParams);

        }
        int total=iCommentBLL.getCommentListByUserid(userid,pageNum,pageSize).getTotal();
        resultMap.put("total", total);
        resultMap.put("list", myCommentParamsList);
        return resultMap;
    }
}
