package com.tv.variety.controller.impl;

import com.tv.variety.controller.IVarietyController;
import com.tv.variety.facade.IVarietyFacade;
import com.tv.variety.facade.impl.VarietyFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.util.JsonResult;
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
@RequestMapping(value = "/YqLook")
public class VarietyController implements IVarietyController {
    @Autowired
    private IVarietyFacade varietyFacade;

    @Override
    @RequestMapping(value ="/varietyDetails", method = RequestMethod.POST)
    public JsonResult findvarietyByName(String name) {
        Variety variety=new Variety();
        variety=varietyFacade.findVarietyByName(name);
        return new JsonResult(variety,"综艺节目详细信息返回 成功",1);
    }
}
