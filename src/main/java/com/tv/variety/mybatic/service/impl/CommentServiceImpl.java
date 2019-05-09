package com.tv.variety.mybatic.service.impl;

import com.tv.variety.mybatic.model.Comment;
import com.tv.variety.mybatic.mapper.CommentMapper;
import com.tv.variety.mybatic.service.CommentService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-30
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

}
