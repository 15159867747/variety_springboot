package com.tv.variety.controller.impl;


import com.tv.variety.mybatic.model.User;
import com.tv.variety.util.JsonResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jsonresult")
public class JsonResultController {

    @RequestMapping("/user")
    public JsonResult<User> getUser() {

        User user = new User();
        user.setId("1");
        user.setName("倪升武");
        user.setPassword("123456");
        return new JsonResult<>(user);
    }

    @RequestMapping("/list")
    public JsonResult<List> getUserList() {
        List<User> userList = new ArrayList<>();

        User user1 = new User();
        user1.setId("1");
        user1.setName("倪升武");
        user1.setPassword("123456");
        User user2 = new User();
        user2.setId("2");
        user2.setName("达人课");
        user2.setPassword("123456");
        userList.add(user1);
        userList.add(user2);
        return new JsonResult<List>(userList, "获取用户列表成功",1);
    }

    @RequestMapping("/map")
    public JsonResult<Map> getMap() {
        Map<String, Object> map = new HashMap<>(3);

        User user = new User( );
        user.setId("1");
        user.setName("倪升武");
        user.setPassword(null);
        map.put("作者信息", user);
        map.put("博客地址", "http://blog.itcodai.com");
        map.put("CSDN地址", null);
        map.put("粉丝数量", 4153);
        return new JsonResult<>(map);
    }
}
