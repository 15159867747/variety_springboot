package com.tv.variety.controller.impl;

import com.tv.variety.controller.IUserHtmlController;
import com.tv.variety.util.annotation.UnInterception;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Controller
@RequestMapping(value = "/API")
public class UserHtmlController implements IUserHtmlController {

    @Override
    @RequestMapping(value ="/test", method = RequestMethod.GET)
//    @UnInterception
    public String test() {

        return "index1";
    }
}
