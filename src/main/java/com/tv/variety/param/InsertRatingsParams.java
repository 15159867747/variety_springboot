package com.tv.variety.param;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class InsertRatingsParams {
    private String varietyId;
    private int ratings;
    private String userid;
}
