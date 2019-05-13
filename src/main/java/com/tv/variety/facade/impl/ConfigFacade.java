package com.tv.variety.facade.impl;

import com.tv.variety.bll.IConfigPicBLL;
import com.tv.variety.facade.IConfigFacade;
import com.tv.variety.mybatic.model.Configpic;
import com.tv.variety.param.ConfigpicParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Service
public class ConfigFacade implements IConfigFacade {
    @Autowired
    private IConfigPicBLL iConfigPicBLL;

    @Override
    public int updateConfigPic(ConfigpicParams configpicParams) {
        Date date = new Date();
        long nowtime = (long) (date.getTime());
        Configpic configpic=new Configpic();
        configpic.setDetail(configpicParams.getDetail());
        configpic.setId(configpicParams.getId());
        configpic.setName(configpicParams.getName());
        configpic.setPicurl(configpicParams.getPicurl());
        configpic.setVarietyId(configpicParams.getVarietyId());
        configpic.setUpdateUserid(configpicParams.getUpdateUserid());
        configpic.setUpdatetime(nowtime);
        int rs =iConfigPicBLL.update(configpic);
        return rs;
    }

    @Override
    public List<Configpic> showConfigPic() {
        return iConfigPicBLL.showPicList();
    }
}
