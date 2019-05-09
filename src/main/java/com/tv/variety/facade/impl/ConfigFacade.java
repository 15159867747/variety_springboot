package com.tv.variety.facade.impl;

import com.tv.variety.bll.IConfigPicBLL;
import com.tv.variety.facade.IConfigFacade;
import com.tv.variety.mybatic.model.Configpic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public int updateConfigPic(Configpic configpic) {
        int rs =iConfigPicBLL.update(configpic);
        return rs;
    }

    @Override
    public List<Configpic> showConfigPic() {
        return iConfigPicBLL.showPicList();
    }
}
