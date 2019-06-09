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

    //删除评星
    int deleteRatings(String id);

    //判断该用户下，该节目是否有评星
    int checkUserRating(String user,String varietyid);

    //判断该用户是否有评论过节目
    int checkUserRating(String user);

    //总评论数
    int countUserRatings();

    //当前有被评星的节目
    int countVarietyRatings();

    //当前有评过星的用户
    int countDistinctUserRatings();

    //截止日期前的总评星数
    int countUserRatings(long limittime);

    //判断该用户是否有评论过节目  在該時間之前
    int checkUserRating(String user,long time);

    //该节目的平均评分
    Float aveRating(String varietyid);

}
