package com.tv.variety.controller;

import com.tv.variety.mybatic.model.Configpic;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigController {

    JsonResult updateConfigPic(Configpic configpic);

    //展示轮播图
    JsonResult showConfigPic();

}
