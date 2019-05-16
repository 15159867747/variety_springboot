package com.tv.variety.bll;

import com.tv.variety.mybatic.model.Configparams;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public interface IConfigParamsBLL {

    int add(Configparams configparams);

    int delete();

    void test();

    Configparams getValueByKey(String key);

    Configparams getKey(String value);

    Configparams getKey_Variety(String value);

}
