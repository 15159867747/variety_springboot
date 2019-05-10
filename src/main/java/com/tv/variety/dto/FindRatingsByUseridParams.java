package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class FindRatingsByUseridParams {
    String id;
    String varietyId;
    String varietyName;
    long time;
    int ratings;
    String picurl;
}
