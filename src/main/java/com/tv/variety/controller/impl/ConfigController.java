package com.tv.variety.controller.impl;

import com.tv.variety.controller.IConfigController;
import com.tv.variety.facade.IConfigFacade;
import com.tv.variety.mybatic.model.Configpic;
import com.tv.variety.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.security.krb5.Config;

import java.util.ArrayList;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@RestController
//@Controller
@RequestMapping(value = "/ConfigPic")
public class ConfigController implements IConfigController {

    @Autowired
    private IConfigFacade iConfigFacade;

    @Override
    @RequestMapping(value = "/updeteConfigpic" , method = RequestMethod.POST)
    public JsonResult updateConfigPic(Configpic configpic) {
        if (configpic.getVarietyId().trim().equals("") || configpic.getVarietyId() == null)
        {
            return new JsonResult<>(-1,"轮播图修改失败哦");
        }
        int rs = iConfigFacade.updateConfigPic(configpic);
        if (rs==0)
        {
            return new JsonResult<>(-1,"轮播图修改失败哦");
        }
        return new JsonResult<>(1,"轮播图修改成功哦");
    }

    @Override
    @RequestMapping(value = "/showConfigPic" , method = RequestMethod.POST)
    public JsonResult showConfigPic() {
        List<Configpic> configpics=new ArrayList<Configpic>();
        configpics=iConfigFacade.showConfigPic();
        return new JsonResult(configpics,"轮播图后台返回成功",1);
    }
}
