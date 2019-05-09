package com.tv.variety.controller;

import com.tv.variety.util.JsonResult;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IPythonActionController {
    JsonResult beginPython(String tv);

    JsonResult actionNowPython(String id);
}
