package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.IConfigPicBLL;
import com.tv.variety.mybatic.mapper.ConfigpicMapper;
import com.tv.variety.mybatic.model.Configpic;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigPicBLL implements IConfigPicBLL {
    @Resource
    private ConfigpicMapper configpicMapper;
    @Override
    public int update(Configpic configpic) {
        EntityWrapper<Configpic> wrapper = new EntityWrapper<Configpic>();
        wrapper.eq("id ", configpic.getId());
        int i =configpicMapper.update(configpic,wrapper);
        return i;
    }

    @Override
    public List<Configpic> showPicList() {
        EntityWrapper<Configpic> wrapper = new EntityWrapper<Configpic>();
        wrapper.eq("id",1).or().eq("id",2).or().eq("id",3).
        or().eq("id",4).or().eq("id",5).or().eq("id",6);
        List<Configpic> configpics=configpicMapper.selectList(wrapper);
        return configpics;
    }
}
