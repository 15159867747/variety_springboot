package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class SearchVarietyparams {
     String id;
     String btn;
     String[] area;
     String[] fromtv;
     String[] type;
     String picurl;
     String name;
     String content;
     String update;
}
