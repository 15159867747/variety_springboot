package com.tv.variety.facade;

import com.tv.variety.mybatic.model.Configpic;

import java.util.List;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigFacade {
    //修改轮播图
    int updateConfigPic(Configpic configpic);

    //展示轮播图

    List<Configpic> showConfigPic();

}
