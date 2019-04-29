package com.tv.variety.mybatic.service.impl;

import com.tv.variety.mybatic.model.Token;
import com.tv.variety.mybatic.mapper.TokenMapper;
import com.tv.variety.mybatic.service.TokenService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-29
 */
@Service
public class TokenServiceImpl extends ServiceImpl<TokenMapper, Token> implements TokenService {

}
