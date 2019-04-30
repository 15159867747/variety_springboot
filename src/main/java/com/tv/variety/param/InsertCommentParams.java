package com.tv.variety.param;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class InsertCommentParams {
    private String userid;
    private String varietyId;
    private String comment;
}
