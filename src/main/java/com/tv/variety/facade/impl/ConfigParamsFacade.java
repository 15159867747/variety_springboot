package com.tv.variety.facade.impl;

import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.bll.IUserBLL;
import com.tv.variety.bll.IVarietyMongoDB;
import com.tv.variety.facade.IConfigParamsFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.mybatic.model.Configparams;
import com.tv.variety.mybatic.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigParamsFacade implements IConfigParamsFacade {
    @Autowired
    private IVarietyMongoDB varietyMongoDB;

    @Autowired
    private IUserBLL userBLL;
    @Autowired
    private IConfigParamsBLL configParamsBLL;
    @Override
    public int insertUser() {

        List<User> listUser=userBLL.allUser();
        for (int i=0;i<listUser.size();i++)
        {
            User user =listUser.get(i);
            Configparams configparams=new Configparams();
            configparams.setKey(user.getId());
            configparams.setValue(i+1);
            configParamsBLL.add(configparams);
        }
        return 1;
    }

    @Override
    public int insertVariety() {
        List<Variety> varietyList=varietyMongoDB.allVarietyList();
        for (int i=0;i<varietyList.size();i++)
        {
            Variety variety =varietyList.get(i);
            Configparams configparams=new Configparams();
            configparams.setKey(variety.getId());
            configparams.setValue(i+1);
            configParamsBLL.add(configparams);
        }
        return 1;
    }

    @Override
    public int delete() {
        return configParamsBLL.delete();
    }
}
