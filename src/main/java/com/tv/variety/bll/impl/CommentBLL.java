package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.ICommentBLL;
import com.tv.variety.mybatic.mapper.CommentMapper;
import com.tv.variety.mybatic.model.Comment;
import com.tv.variety.util.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class CommentBLL implements ICommentBLL {
    @Resource
    private CommentMapper commentMapper;
    @Override
    public Page<Comment> getCommentList(String varietyId,int pageNum,int pageSize) {
        Page<Comment> page=new Page<Comment>(pageNum,pageSize);
        EntityWrapper<Comment> entityWrapper=new EntityWrapper<Comment>();
        entityWrapper.eq("varietyId",varietyId).orderBy("commentDate");
        List<Comment> commentsList= commentMapper.selectPage(page,entityWrapper);
        page.setRecords(commentsList);
        return page;
    }

    @Override
    public int insertComment(Comment comment) {
        int rs=commentMapper.insert(comment);
        return rs;
    }

    @Override
    public int deleteComment(String id) {
        EntityWrapper<Comment> entityWrapper=new EntityWrapper<Comment>();
        entityWrapper.eq("id",id);
        int rs=commentMapper.delete(entityWrapper);
        return 0;
    }

    @Override
    public Page<Comment> getCommentListByUserid(String userid, int pageNum, int pageSize) {
        Page<Comment> page=new Page<Comment>(pageNum,pageSize);
        EntityWrapper<Comment> entityWrapper=new EntityWrapper<Comment>();
        entityWrapper.eq("userid",userid).orderBy("commentDate");
        List<Comment> commentsList= commentMapper.selectPage(page,entityWrapper);
        page.setRecords(commentsList);
        return page;
    }
}
