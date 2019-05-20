package com.tv.variety.controller.impl;


import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.bll.IRatingsBLL;
import com.tv.variety.controller.IVarietyController;
import com.tv.variety.dto.SearchVarietyparams;
import com.tv.variety.dto.VarietyDetailsParam;
import com.tv.variety.facade.IRatingsFacade;
import com.tv.variety.facade.IVarietyFacade;
import com.tv.variety.facade.impl.VarietyFacade;
import com.tv.variety.mongodb.POJO.Variety;
import com.tv.variety.param.AllVarietyParams;
import com.tv.variety.param.VarietyParams;
import com.tv.variety.util.JsonResult;
import com.tv.variety.util.mongodb.PageResult;
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
@RequestMapping(value = "/YqLook")
public class VarietyController implements IVarietyController {
    @Autowired
    private IVarietyFacade varietyFacade;
    @Autowired
    private IRatingsFacade ratingsFacade;
    @Autowired
    private IConfigParamsBLL iConfigParamsBLL;

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
        if(all.trim().equals(""))
        {
            return  new JsonResult(-1,"搜索失败哦");
        }
        PageResult<SearchVarietyparams> paramsPageResult=new PageResult<SearchVarietyparams>();
        paramsPageResult=varietyFacade.searcherVarietyAll(all,pageNum,pageSize);
        return new JsonResult(paramsPageResult,"成功",1);
    }

    @Override
    @RequestMapping(value ="/getAllVariety", method = RequestMethod.POST)
    public JsonResult getAllVariety() {
        List<AllVarietyParams> allVarietyParamsList=new ArrayList<AllVarietyParams>();
        allVarietyParamsList=varietyFacade.getAllVariety();
        return new JsonResult(allVarietyParamsList,"成功",1);
    }

    @Override
    @RequestMapping(value ="/varietyByTypeOrArea", method = RequestMethod.POST)
    public JsonResult findVarietyByTypeOrArea(String area, String type,int pageNum,int pageSize) {
        PageResult<VarietyParams> paramsPageResult=new PageResult<VarietyParams>();
        paramsPageResult=varietyFacade.findVarietyByTypeOrArea(area,type,pageNum,pageSize);
        return new JsonResult(paramsPageResult,"成功",1);
    }

    @Override
    @RequestMapping(value ="/varietySame", method = RequestMethod.POST)
    public JsonResult findVarietyByType(String type, String name) {
        PageResult<VarietyParams> paramsPageResult=new PageResult<VarietyParams>();
        paramsPageResult=varietyFacade.findVarietyByType(type,name);
        return new JsonResult(paramsPageResult,"成功",1);
    }

    @Override
    @RequestMapping(value ="/recommend", method = RequestMethod.POST)
    public JsonResult recommend(String userid,String type) {
        Python python=new Python();
        int rs=ratingsFacade.checkUserRatings(userid);
        if (rs==0||userid==""||userid==null)
        {
            PageResult<VarietyParams> paramsPageResult=new PageResult<VarietyParams>();
            paramsPageResult=varietyFacade.findVarietyByTypeForRecommend(type);
            return new JsonResult(paramsPageResult.getList(),"新用户推荐成功",-1);
        }
        else{
            List<VarietyParams> varietyParamsList=new ArrayList<VarietyParams>();
//            System.out.println(iConfigParamsBLL.getValueByKey(userid).getValue());
            List<String> list=python.recommendpy(String.valueOf(iConfigParamsBLL.getValueByKey(userid).getValue()));
            if (list==null)
            {
                PageResult<VarietyParams> paramsPageResult=new PageResult<VarietyParams>();
                paramsPageResult=varietyFacade.findVarietyByTypeForRecommend(type);
                return new JsonResult(paramsPageResult.getList(),"推荐异常，用新用户进行推荐",-1);
            }
            varietyParamsList=varietyFacade.getRecommend(list);
            return new JsonResult(varietyParamsList,"老用户推荐成功",1);
        }

    }


    @Override
    @RequestMapping(value ="/countAllVarietyNum", method = RequestMethod.POST)
    public JsonResult countAllVarietyNum() {
        return new JsonResult(varietyFacade.countAllVarietyNum(),"总节目数",1);
    }
}
