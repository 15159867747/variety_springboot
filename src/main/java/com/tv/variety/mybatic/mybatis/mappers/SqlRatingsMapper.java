package com.tv.variety.mybatic.mybatis.mappers;

import com.tv.variety.mybatic.model.Ratings;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;


/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Mapper
public interface SqlRatingsMapper extends BaseMapper<Ratings>{
Integer selectCountRatings();
}



/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author yrongqin
 * @since 2019-04-29
 */

