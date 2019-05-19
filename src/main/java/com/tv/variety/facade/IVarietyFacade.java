package com.tv.variety.facade;


import com.tv.variety.dto.SearchVarietyparams;
import com.tv.variety.dto.VarietyDetailsParam;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.param.AllVarietyParams;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.mongodb.PageResult;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IVarietyFacade {

    //根据综艺名查找综艺的详细信息
    VarietyDetailsParam findVarietyByName(String name, String userid);

    PageResult<VarietyParams> findVarietyByType(String type);

    //根据id查是否有该节目
    Variety findVarietyById(String id);

    //搜索节目
    PageResult<SearchVarietyparams> searcherVarietyAll(String all,int pageNum,int pageSize);

    //查询所有节目
    List<AllVarietyParams> getAllVariety();

    //根据类型和地区进行组合查询

    PageResult<VarietyParams> findVarietyByTypeOrArea(String area,String type,int pageNum,int pageSize);

    //根据类型查询所有节目，除了该节目
    PageResult<VarietyParams> findVarietyByType(String type,String name);

    //根据推荐的节目查询节目
    List<VarietyParams> getRecommend(List<String> list);

    //根据新用户进行推荐
    PageResult<VarietyParams> findVarietyByTypeForRecommend(String type);

    //总节目数
    int countAllVarietyNum();
}
