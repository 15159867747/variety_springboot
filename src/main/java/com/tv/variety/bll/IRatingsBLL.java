package com.tv.variety.bll;

import com.baomidou.mybatisplus.plugins.Page;
import com.tv.variety.mybatic.model.Comment;
import com.tv.variety.mybatic.model.Ratings;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IRatingsBLL {

    //添加评分
   int insertRatings(Ratings ratings);

   //修改评分
   int updateRatings(Ratings ratings);

   //查询
    List<Ratings> seracherRatings(String userid, String varietyId);

    //查询用户下所有的评星
    Page<Ratings> getRatingsListByUserid(String userid, int pageNum, int pageSize);
}
