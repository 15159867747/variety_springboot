package com.tv.variety.bll;

import com.tv.variety.mybatic.model.Configpic;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigPicBLL {
    //修改轮播图
    int update(Configpic configpic);

    //展示轮播图

    List<Configpic> showPicList();

}
