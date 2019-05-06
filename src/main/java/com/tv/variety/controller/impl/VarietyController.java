package com.tv.variety.controller.impl;


import com.tv.variety.controller.IVarietyController;
import com.tv.variety.dto.SearchVarietyparams;
import com.tv.variety.dto.VarietyDetailsParam;
import com.tv.variety.facade.IVarietyFacade;
import com.tv.variety.facade.impl.VarietyFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.JsonResult;
import com.tv.variety.util.mongodb.PageResult;
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
    public JsonResult findvarietyByName(String name,String userid) {
        VarietyDetailsParam varietyDetailsParam=new VarietyDetailsParam();
        varietyDetailsParam=varietyFacade.findVarietyByName(name,userid);
        return new JsonResult(varietyDetailsParam,"综艺节目详细信息返回 成功",1);
    }

    @Override
    @RequestMapping(value ="/varietyByType", method = RequestMethod.POST)
    public JsonResult findVarietyByType(String type) {
        PageResult<VarietyParams> paramsPageResult=new PageResult<VarietyParams>();
        paramsPageResult=varietyFacade.findVarietyByType(type);
        return new JsonResult(paramsPageResult,"成功",1);
    }

    @Override
    @RequestMapping(value ="/varietyById", method = RequestMethod.POST)
    public JsonResult findvarietyById(String id,String name) {
        Variety variety=varietyFacade.findVarietyById(id);
        if (variety.getId()!=null&&variety.getName()!=null){
            if (variety.getId().equals(id)&&variety.getName().equals(name)){
                return new JsonResult(1,"该节目存在");

            }
        }

        return  new JsonResult(-1,"没有该节目哦");

    }

    @Override
    @RequestMapping(value ="/search", method = RequestMethod.POST)
    public JsonResult searcherVarietyAll(String all,int pageNum,int pageSize) {
        PageResult<SearchVarietyparams> paramsPageResult=new PageResult<SearchVarietyparams>();
        paramsPageResult=varietyFacade.searcherVarietyAll(all,pageNum,pageSize);
        return new JsonResult(paramsPageResult,"成功",1);
    }
}
