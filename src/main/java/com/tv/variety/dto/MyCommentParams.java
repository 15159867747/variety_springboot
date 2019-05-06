package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class MyCommentParams {
    String varietyId;
    String name;
    String picurl;
    long commentDate;
    String comment;
    String id;
}
