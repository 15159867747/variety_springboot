package com.tv.variety.controller.impl;

import com.tv.variety.controller.IConfigpyController;
import com.tv.variety.facade.IConfigpyFacade;
import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.param.UpdateConfigpyParams;
import com.tv.variety.util.JsonResult;
import com.tv.variety.util.python.Python;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@RestController
//@Controller
@RequestMapping(value = "/Configpy")
public class ConfigpyController implements IConfigpyController {
    @Autowired
    private IConfigpyFacade iConfigpyFacade;

    @Override
    @RequestMapping(value = "/updeteConfigpy" , method = RequestMethod.POST)
    public JsonResult updateConfigpy(UpdateConfigpyParams updateConfigpyParams) {
        int rs=iConfigpyFacade.updateConfigpy(updateConfigpyParams);
        if (rs==0)
        {
            return new JsonResult<>(-1,"爬虫配置失败");
        }
        return new JsonResult<>(1,"爬虫配置成功");
    }

    @Override
    @RequestMapping(value = "/getAllconfigpy" , method = RequestMethod.POST)
    public JsonResult getAllConfigpy() {
        List<Configpy> configpyList=new ArrayList<Configpy>();
        configpyList=iConfigpyFacade.showConfigpyAll();
        return new JsonResult(configpyList,"爬虫配置信息返回成功",1);
    }

    @Override
    @RequestMapping(value = "/getConfigpyById" , method = RequestMethod.POST)
    public JsonResult showConfigpy(int id) {
        Configpy configpy=new Configpy();
        configpy=iConfigpyFacade.showConfigpy(id);
        return new JsonResult(configpy,"根据id查询配置信息成功",1);
    }

    @Override
    @RequestMapping(value = "/beginNow" , method = RequestMethod.POST)
    public JsonResult actionPyNow(int id) {
        Configpy configpy=new Configpy();
        configpy=iConfigpyFacade.showConfigpy(id);
        if(configpy.getStatus()==0)
        {
            iConfigpyFacade.updateConfigpy(configpy.getId(),1);
            Python python=new Python();
            if (id==1){
                python.youkuAction();
                iConfigpyFacade.updateConfigpy(configpy.getId(),2);
                return new JsonResult<>(1,"立即爬取优酷成功");
            }
            if (id==2)
            {
                python.MongoTvAction();
                iConfigpyFacade.updateConfigpy(configpy.getId(),2);
                return new JsonResult<>(1,"立即爬取芒果tv成功");
            }

        }

        return new JsonResult<>(-1,"立即爬取失败");
    }


}
