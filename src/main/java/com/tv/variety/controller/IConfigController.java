package com.tv.variety.controller;

import com.tv.variety.mybatic.model.Configpic;
import com.tv.variety.param.ConfigpicParams;
import com.tv.variety.util.JsonResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigController {

    JsonResult updateConfigPic(ConfigpicParams configpic);

    //展示轮播图
    JsonResult showConfigPic();

    JsonResult uploadPic( MultipartFile pic);

}
