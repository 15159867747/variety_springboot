package com.tv.variety.controller.impl;

import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.controller.IConfigParamsController;
import com.tv.variety.facade.IConfigParamsFacade;
import com.tv.variety.facade.IConfigpyFacade;
import com.tv.variety.util.JsonResult;
import com.tv.variety.util.python.Python;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@RestController
//@Controller
@RequestMapping(value = "/ConfigParams")
public class ConfigParamsController implements IConfigParamsController {

    @Autowired
    private IConfigParamsFacade configParamsFacade;

    @Autowired
    private IConfigpyFacade iConfigpyFacade;
    @Autowired
    private IConfigParamsBLL iConfigParamsBLL;


    @Override
    @RequestMapping(value = "/addConfigParams" , method = RequestMethod.POST)
    public JsonResult addConfigParams() {
        int de=configParamsFacade.delete();
        int ru =configParamsFacade.insertUser();
        int rv=configParamsFacade.insertVariety();

        return new JsonResult<>(1,"配置成功");
    }

    @Override
    @RequestMapping(value = "/test" , method = RequestMethod.POST)
    public JsonResult test() {
        iConfigParamsBLL.test();
        return new JsonResult<>(1,"success");
    }

    @Override
    @RequestMapping(value = "/actionConfig" , method = RequestMethod.POST)
    public JsonResult actionConfig() {
        Python python =new Python();
        return null;
    }
}
