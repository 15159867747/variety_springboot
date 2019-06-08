package com.tv.variety.controller;

import com.tv.variety.param.UpdateConfigSimParams;
import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigParamsController {



//    JsonResult addConfigParams(long time);

    JsonResult test();

    JsonResult actionConfig(UpdateConfigSimParams updateConfigSimParams);

}
