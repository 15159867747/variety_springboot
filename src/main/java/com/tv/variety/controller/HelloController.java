package com.tv.variety.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * @ClassName HelloController
 * @Description TODO
 * @Author Rock-PC5
 * @Date 2018/9/13 9:02
 * @Version 1.0
 **/
@RestController
public class HelloController {

    //模拟用户登录验证
    @RequestMapping(value = "/login/{username}/{password}",method = RequestMethod.GET)
    public Object login(@PathVariable String username,@PathVariable String password){
        System.out.println(username);
        System.out.println(password);
        return "success";
    }

    //模拟现实用户信息
    @RequestMapping(value = "/list")
    public Object list(){
        String username = "root";
        String password = "123456";
        HashMap<Object, Object> objectObjectHashMap = new HashMap<>(1);
        objectObjectHashMap.put("username",username);
        objectObjectHashMap.put("password",password);
        return objectObjectHashMap;
    }
}