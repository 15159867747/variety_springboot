package com.tv.variety.controller.impl;

import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.controller.IConfigParamsController;
import com.tv.variety.facade.IConfigParamsFacade;
import com.tv.variety.facade.IConfigpyFacade;
import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.param.UpdateConfigSimParams;
import com.tv.variety.param.UpdateConfigpyParams;
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


//    @Override
//    @RequestMapping(value = "/addConfigParams" , method = RequestMethod.POST)
//    public JsonResult addConfigParams(long time) {
//        int de=configParamsFacade.delete();
//        int ru =configParamsFacade.insertUser(time);
//        int rv=configParamsFacade.insertVariety();
//
//        return new JsonResult<>(1,"离线计算配置成功");
//    }

    @Override
    @RequestMapping(value = "/test" , method = RequestMethod.POST)
    public JsonResult test() {
        iConfigParamsBLL.test();
        return new JsonResult<>(1,"success");
    }

    @Override
    @RequestMapping(value = "/actionConfig" , method = RequestMethod.POST)
    public JsonResult actionConfig(UpdateConfigSimParams updateConfigSimParams) {
        int de=configParamsFacade.delete();
        int ru =configParamsFacade.insertUser(updateConfigSimParams.getAtctionime());
        int rv=configParamsFacade.insertVariety();

        Python python =new Python();
        Configpy configpy=new Configpy();
        configpy=iConfigpyFacade.showConfigpy(updateConfigSimParams.getId());
        UpdateConfigpyParams updateConfigpyParams=new UpdateConfigpyParams();

        updateConfigpyParams.setStatus(updateConfigSimParams.getStatus());
        updateConfigpyParams.setAtctionime(updateConfigSimParams.getAtctionime());
        updateConfigpyParams.setId(updateConfigSimParams.getId());
        updateConfigpyParams.setUserid(updateConfigSimParams.getUserid());

        if(configpy.getStatus()==0||configpy.getStatus()==3||configpy.getStatus()==2||configpy.getStatus()==-1) {

            iConfigpyFacade.updateConfigpy(updateConfigpyParams);
            if (updateConfigpyParams.getId()==3)
            {   System.out.println(Long.toString(updateConfigSimParams.getAtctionime()));
                int rs1=python.getRatings(Long.toString(updateConfigSimParams.getAtctionime()));

                if (rs1==0)
                {
                    return new JsonResult<>(-1,"getRatings失败，执行过程出错");
                }
                int rs2=python.MovieRatingsAction();
                if (rs2==0)
                {
                    return new JsonResult<>(-1,"MovieRatingsActions执行过程出错");
                }
                int rs3=python.SklearnAction();
                if (rs3==0)
                {
                    return new JsonResult<>(-1,"SklearnAction,执行过程出错");
                }
                int rs4=python.SimAction();
                if (rs4==0)
                {
                    return new JsonResult<>(-1,"SimAction,执行过程出错");
                }
                System.out.println("离线相似度计算成功");
                iConfigpyFacade.updateConfigpy(configpy.getId(),2);
                return new JsonResult<>(1,"离线相似度计算成功");


            }
        }
        return new JsonResult<>(0,"离线相似度计算失败，该任务不是处于待执行状态");

    }
}
