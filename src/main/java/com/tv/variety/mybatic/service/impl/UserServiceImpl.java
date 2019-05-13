package com.tv.variety.mybatic.service.impl;

import com.tv.variety.mybatic.model.User;
import com.tv.variety.mybatic.mapper.UserMapper;
import com.tv.variety.mybatic.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author yrongqin
 * @since 2019-05-13
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
