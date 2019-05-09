package com.tv.variety.facade.impl;

import com.tv.variety.bll.IConfigPythonBLL;
import com.tv.variety.bll.impl.ConfigPythonBLL;
import com.tv.variety.facade.IConfigpyFacade;
import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.param.UpdateConfigpyParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigpyFacade implements IConfigpyFacade {
    @Autowired
    private IConfigPythonBLL configPythonBLL;

    @Override
    public int updateConfigpy(UpdateConfigpyParams updateConfigpyParams) {
        Configpy configpy=new Configpy();
        configpy.setId(updateConfigpyParams.getId());
        configpy.setActiontime(updateConfigpyParams.getAtctionime());
        configpy.setStatus(updateConfigpyParams.getStatus());
        int rs=configPythonBLL.update(configpy);
        return rs;
    }

    @Override
    public List<Configpy> showConfigpyAll() {
        List<Configpy> configpyList=new ArrayList<Configpy>();
        configpyList=configPythonBLL.showConfigpyAll();
        return configpyList;
    }

    @Override
    public Configpy showConfigpy(int id) {
        return configPythonBLL.showConfigpy(id);
    }

    @Override
    public int updateConfigpy(int id,int status) {
        Configpy configpy=new Configpy();
        configpy.setId(id);
        configpy.setStatus(status);
        int rs=configPythonBLL.update(configpy);
        return rs;
    }
}
