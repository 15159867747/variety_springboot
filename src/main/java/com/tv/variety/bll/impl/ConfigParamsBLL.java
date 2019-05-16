package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.mybatic.mapper.ConfigparamsMapper;
import com.tv.variety.mybatic.model.Configparams;
import com.tv.variety.mybatic.model.Ratings;
import com.tv.variety.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.*;
/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigParamsBLL implements IConfigParamsBLL {


    @Autowired
    private IConfigParamsBLL iConfigParamsBLL;

    @Autowired
    private IRatingsBLL iRatingsBLL;

    @Resource
    ConfigparamsMapper configparamsMapper;

    @Override
    public int add(Configparams configparams) {
        int c=configparamsMapper.insert(configparams);
        return c;

    }

    @Override
    public int delete() {
        EntityWrapper<Configparams> wrapper = new EntityWrapper<Configparams>();
        wrapper.notIn("id","");
        configparamsMapper.delete(wrapper);
        int i =configparamsMapper.delete(wrapper);
        return i;
    }

    @Override
    public void test() {

        for (int i=100000;i<=100031;i++)
        {
            for (int j=0;j<=50;j++)
            {
                String userid=String.valueOf(i);
                int random = (int)(Math.random()*100+1);
//                int ratings=(int)(Math.random()*100+1);
                int check=iRatingsBLL.checkUserRating(userid,getKey_Variety(String.valueOf(random)).getKey());
                if (check==0)
                {
                    Date date = new Date();
                    long nowtime = (long) (date.getTime());
                    Ratings ratings=new Ratings();
                    ratings.setId(UUIDGenerator.getUUID());
                    ratings.setRatings((int)(Math.random()*5+1));
                    ratings.setTime(nowtime);
                    ratings.setUserid(userid);
                    ratings.setVarietyId(getKey_Variety(String.valueOf(random)).getKey());
                    int rs =iRatingsBLL.insertRatings(ratings);
                }
                else{
                    continue;
                }


            }
        }



    }

    @Override
    public Configparams getValueByKey(String key) {
        EntityWrapper<Configparams> wrapper = new EntityWrapper<Configparams>();

        wrapper.eq("`key`",key);
        List<Configparams> list =configparamsMapper.selectList(wrapper);
        if (list.size()>0)
        {
            return list.get(0);
        }
        return null;
    }
    @Override
    public Configparams getKey_Variety(String value) {
        EntityWrapper<Configparams> wrapper = new EntityWrapper<Configparams>();
        wrapper.eq("value",value);
        List<Configparams> list =configparamsMapper.selectList(wrapper);
        Configparams configparams;
        for (int i=0;i<list.size();i++)
        {   configparams=new Configparams();
            configparams=list.get(i);
            if (configparams.getKey().length()>18)
            {
                  return list.get(i);
            }
        }
        return null;
    }
    @Override
    public Configparams getKey(String value) {
        EntityWrapper<Configparams> wrapper = new EntityWrapper<Configparams>();
        wrapper.eq("value",value);
        List<Configparams> list =configparamsMapper.selectList(wrapper);
        for (int i=0;i<list.size();i++)
        {
            Configparams configparams=list.get(i);
            if (configparams.getKey().length()<=18)
            {
                return list.get(i);
            }
        }
        return null;
    }



}
