package com.tv.variety.controller.impl;

import com.tv.variety.controller.IConfigController;
import com.tv.variety.facade.IConfigFacade;
import com.tv.variety.mybatic.model.Configpic;
import com.tv.variety.param.ConfigpicParams;
import com.tv.variety.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    public JsonResult updateConfigPic(ConfigpicParams configpic) {
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

    @Override
    @RequestMapping(value = "/uploadPic" , method = RequestMethod.POST)
    public JsonResult uploadPic( @RequestParam(value="file",required=false)MultipartFile pic) {

        if (pic==null) {
            System.out.println("文件为空空");
            return new JsonResult<>(-1,"失败");
        }

        String fileName = pic.getOriginalFilename();  // 文件名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
        String filePath = "D://uploadImage//"; // 上传后的路径
        fileName = UUID.randomUUID() + suffixName; // 新文件名
        File dest = new File(filePath + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            pic.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filename = "/uploadImage/" + fileName;
        return new JsonResult(filename,"轮播图后台返回成功",1);
    }
}
