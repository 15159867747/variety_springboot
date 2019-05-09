package com.tv.variety.bll.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tv.variety.bll.IConfigPythonBLL;
import com.tv.variety.mybatic.mapper.ConfigpyMapper;
import com.tv.variety.mybatic.model.Configpy;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigPythonBLL implements IConfigPythonBLL {
    @Resource
    private ConfigpyMapper configpyMapper;
    @Override
    public Configpy showConfigpy(int id) {
        return configpyMapper.selectById(id);
    }

    @Override
    public List<Configpy> showConfigpyAll() {
        List<Configpy> configpyList=new ArrayList<Configpy>();
        EntityWrapper<Configpy> entityWrapper=new EntityWrapper<Configpy>();
        entityWrapper.eq("id",1).or().eq("id",2);
        configpyList=configpyMapper.selectList(entityWrapper);
        return configpyList;

    }

    @Override
    public int update(Configpy configpy) {

        EntityWrapper<Configpy> wrapper = new EntityWrapper<Configpy>();
        wrapper.eq("id ", configpy.getId());
        int i =configpyMapper.update(configpy,wrapper);
        return i;
    }

    @Override
    public Configpy showConfigpy(String id) {
        return configpyMapper.selectById(id);
    }
}
