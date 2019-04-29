package com.tv.variety.dto;

import com.tv.variety.mongodb.POJO.Variety;
import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class VarietyDetailsParam {
    private Variety variety;
    private int ratings;

}
